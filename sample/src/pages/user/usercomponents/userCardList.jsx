import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CardOne } from './serviceProviderCard';
import { BACKEND_SERVER } from '../../../secrets/secret.js';
import SearchContext from '../context/searchContext';
import { useNavigate } from 'react-router-dom';
import '../../../style/usercards.css';

export function CardList({ showMore = true }) { // Add showMore prop with default value
  const [profiles, setProfiles] = useState([]);
  const [sortProfile,setSortProfile] = useState([])
  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/cards`);
        if (response.data) {
          console.log(response.data.data);
          
          setProfiles(response.data.data);
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

  const handleSearchPage = async (e) => {
    e.preventDefault();
    try {
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <CardOne key={profile._id} profile={profile} />
          ))
        ) : (
          <p>No mentors found matching your search criteria.</p>
        )}
      </div>
      {showMore && (
        <div className="wrapper" onClick={handleSearchPage}>
          <div className="link_wrapper">
            <a className="special-link">Show More !</a>
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
