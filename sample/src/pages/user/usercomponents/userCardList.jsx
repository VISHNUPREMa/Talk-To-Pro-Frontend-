import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CardOne } from './serviceProviderCard';
import { BACKEND_SERVER } from '../../../secrets/secret.JS';
import SearchContext from '../context/searchContext';

export function CardList() {
  const [profiles, setProfiles] = useState([]);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/cards`);
        if (response.data) {
          console.log(response.data);
          setProfiles(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    fetchData();
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      {filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <CardOne key={profile._id} profile={profile} />
        ))
      ) : (
        <p>No mentors found matching your search criteria.</p>
      )}
    </div>
  );
}
