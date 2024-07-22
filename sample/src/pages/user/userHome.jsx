import React from 'react';
import  Navbar  from './usercomponents/navbar';
import { UserBanner } from './usercomponents/userBanner';
import { CardList } from './usercomponents/userCardList';
import { UserFooter } from './usercomponents/userFooter';
import { InfoBanner } from './usercomponents/newBanner';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../style/userhome.css';
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

function UserHome() {
  return (
    <div className='userhome-div'>
      <div className="navbar-fixed">
        <Navbar />
      </div>
      <div className="content">
   
      <UserBanner />
     
  

        
        <CardList/>
        
        {/* <InfoBanner /> */}
        
      </div>
      <div className="footer-fixed">
        <UserFooter />
      </div>
    </div>
  );
}

export default UserHome;

