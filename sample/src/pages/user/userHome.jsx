import React, { useEffect } from 'react';
import Navbar from './usercomponents/navbar';
import { UserBanner } from './usercomponents/userBanner';
import { CardList } from './usercomponents/userCardList';
import { UserFooter } from './usercomponents/userFooter';
import { InfoBanner } from './usercomponents/newBanner';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../style/userhome.css';
import axiosInstance from '../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../secrets/secret';
import { useData } from '../contexts/userDataContext';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const publicVapidKey = 'BEA5koZZE9-aUZvIDS2w1HqzbS5welevwtFAvwJJLfO_b8fXqsLNi80Fa_wRjXw154SJM3U3ux1vs_ZqkXIRqSY';

function UserHome() {
  const {user} = useData()
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
    
          // Send subscription to your server
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
    
  }, []);

  return (
    <div className='userhome-div'>
      <div className="navbar-fixed">
        <Navbar />
      </div>
      <div className="content">
        <UserBanner />
        <CardList />
        {/* <InfoBanner /> */}
      </div>
      <div className="footer-fixed">
        <UserFooter />
      </div>
    </div>
  );
}

export default UserHome;
