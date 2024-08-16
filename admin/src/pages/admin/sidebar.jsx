import React, { useState } from 'react';
import '../../style/sidebar.css';

const Sidebar = ({ onShowUserList, onShowServiceProviderList , onShowBookingList ,onShowTransactionList , onShowProRequestsList }) => {
  const [showUserList, setShowUserList] = useState(false);
  const [showServiceProviderList, setShowServiceProviderList] = useState(false);
  const [showBookingList , setShowBookingList] = useState(false);
  const [showTransactionList , setShowTransactionList] = useState(false);
  const [showProRequests , setShowProRequests] = useState(false)

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowServiceProviderList(false);
    setShowBookingList(false)
    setShowTransactionList(false)
    setShowProRequests(false)
    onShowUserList(); 
  };

  const handleShowServiceProviderList = () => {
    setShowUserList(false);
    setShowServiceProviderList(true);
    setShowBookingList(false)
    setShowTransactionList(false)
    setShowProRequests(false)
    onShowServiceProviderList(); 
  };

  const handleBookingList = () =>{
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(true)
    setShowTransactionList(false)
    setShowProRequests(false)
    onShowBookingList();
    
  }

      
  const handleTransactionList = () =>{
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(false)
    setShowTransactionList(true)
    setShowProRequests(false)
    onShowTransactionList();

  }

  const handleProRequests = () => {
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(false)
    setShowTransactionList(false)
    setShowProRequests(true)
    onShowProRequestsList()

  }

  return (
    <div className="sidebar">
      <div className="p-4">
        <h2>Talk To Pro</h2>
        <div className="menu">

          <div className={`menu-item user ${showUserList ? 'active' : ''}`} onClick={handleShowUserList}>
            <a className="block text-white">User</a>
          </div>


          <div className={`menu-item service-provider ${showServiceProviderList ? 'active' : ''}`} onClick={handleShowServiceProviderList}>
            <a className="block text-white">Service Provider</a>
          </div>


          <div className={`menu-item service-provider ${showBookingList ? 'active' : ''}`} onClick={handleBookingList}>
            <a className="block text-white">Bookings</a>
          </div>


          <div className={`menu-item service-provider ${showTransactionList ? 'active' : ''}`} onClick={handleTransactionList}>
            <a className="block text-white">Transactions</a>
          </div>

          <div className={`menu-item service-provider ${showProRequests ? 'active' : ''}`} onClick={handleProRequests}>
            <a className="block text-white">Professional Requests</a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
