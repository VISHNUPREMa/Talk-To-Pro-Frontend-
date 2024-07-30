import React, { useEffect, useState } from 'react';
import Navbar from './usercomponents/navbar';
import { UserBanner } from './usercomponents/userBanner';
import { CardList } from './usercomponents/userCardList';
import { UserFooter } from './usercomponents/userFooter';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../style/userhome.css';
import axiosInstance from '../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../secrets/secret';
import { useData } from '../contexts/userDataContext';
import CallModal from './usercomponents/callModal';
import { io } from "socket.io-client";
import Swal from 'sweetalert2';

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const publicVapidKey = 'BEA5koZZE9-aUZvIDS2w1HqzbS5welevwtFAvwJJLfO_b8fXqsLNi80Fa_wRjXw154SJM3U3ux1vs_ZqkXIRqSY';

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
  const [showModal, setShowModal] = useState(false);
  const [callData, setCallData] = useState(null);
  const { user } = useData();
  
    
useEffect(()=>{
  
  const userid = user.userid
socket.emit('on',{userid})
},[])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/worker.js')
        .then(register => {
          console.log('Service Worker registered', register);

          return register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          });
        })
        .then(subscription => {
          console.log('Push subscription', subscription);

          const id = user.userid;
          return axiosInstance.post(`${BACKEND_SERVER}/subscription`, { id, subscription });
        })
        .then(response => {
          console.log('Subscription saved on server', response);
        })
        .catch(error => {
          console.error('Error during service worker registration', error);
        });
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

 
    socket.on('call-request', (data) => {
  
      console.log("Received call request:", data);
      setCallData(data); 
      setShowModal(true); 
    });


    return () => {
      socket.off('call-request');
    };

  }, [user]);
  return (
    <>
      <div className='userhome-div'>
        <div className="navbar-fixed">
          <Navbar />
        </div>
        <div className="content">
          <UserBanner />
          <CardList />
        </div>
        <div className="footer-fixed">
          <UserFooter />
        </div>
      </div>
      {showModal && (
        <CallModal callData={callData} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default UserHome;
