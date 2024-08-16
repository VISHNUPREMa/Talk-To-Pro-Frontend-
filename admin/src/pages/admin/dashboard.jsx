import React, { useState } from 'react';
import Sidebar from './sidebar';
import DashboardMain from './dashboardMain';
import AdminNavbar from './adminNavbar';

const AdminDashboard = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showServiceProviderList, setShowServiceProviderList] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [showTransactionList , setShowTransactions] = useState(false)
  const [showProRequestsList , setShowProRequestsList] = useState(false)

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowServiceProviderList(false);
    setShowBookingList(false);
    setShowTransactions(false)
    setShowProRequestsList(false)
  };

  const handleShowServiceProviderList = () => {
    setShowUserList(false);
    setShowServiceProviderList(true);
    setShowBookingList(false);
    setShowTransactions(false);
    setShowProRequestsList(false)
  };

  const handleShowBookingList = () => {
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(true);
    setShowTransactions(false);
    setShowProRequestsList(false)
  };

  const handleShowTransactionList = () =>{
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(false);
    setShowTransactions(true);
    setShowProRequestsList(false)
  }

  const handleProRequestsList = () =>{
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(false);
    setShowTransactions(false);
    setShowProRequestsList(true)
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        onShowUserList={handleShowUserList} 
        onShowServiceProviderList={handleShowServiceProviderList} 
        onShowBookingList={handleShowBookingList} 
        onShowTransactionList={handleShowTransactionList}
        onShowProRequestsList = {handleProRequestsList}
      />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <DashboardMain 
          showUserList={showUserList} 
          showServiceProviderList={showServiceProviderList} 
          showBookingList={showBookingList}
          showTransactionList={showTransactionList}
          showProRequestsList = {showProRequestsList}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
