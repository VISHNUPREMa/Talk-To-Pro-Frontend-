import React, { useEffect, useState, useContext } from 'react';
import Navbar from './usercomponents/navbar';
import { UserBanner } from './usercomponents/userBanner';
import { CardList } from './usercomponents/userCardList';
import { UserFooter } from './usercomponents/userFooter';
import '../../style/userhome.css';
import axiosInstance from '../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../secrets/secret';
import { useData } from '../contexts/userDataContext';
import CallModal from './usercomponents/callModal';
import { io } from "socket.io-client";
import Swal from 'sweetalert2';
import SearchContext from './context/searchContext';
import { useNavigate } from 'react-router-dom';

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function UserHome() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [callData, setCallData] = useState(null);
  const { user } = useData();
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const userid = user.userid;
    socket.emit('on', { userid });

    socket.on('call-request', (data) => {
      console.log("Received call request:", data);
      setCallData(data); 
      setShowModal(true); 
    });

    return () => {
      socket.off('call-request');
    };
  }, [user]);

  const handleSearchPage = async(e) => {
    e.preventDefault();
    try {
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='userhome-div'>
        <div className="navbar-fixed">
          <Navbar />
        </div>
        <div className="content" style={{ marginTop: '80px', marginLeft: '0px' }}>
          {searchTerm !== "" ? (
            <div className="horizontal-layout">
              <CardList />
            </div>
          ) : (
          <>
            <UserBanner />
            <div className="horizontal-layout" style={{ marginLeft: '100px' }}>
              <CardList />
            </div>
            <div className="wrapper" onClick={handleSearchPage}>
              <div className="link_wrapper">
                <a>Show More !</a>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                    <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="footer-fixed">
              <UserFooter />
            </div>
          </>
          )}
        </div>
      </div>
      {showModal && (
        <CallModal callData={callData} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default UserHome;
