import React, { useState } from 'react';
import Sidebar from './sidebar';
import DashboardMain from './dashboardMain';
import AdminNavbar from './adminNavbar';

const AdminDashboard = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showServiceProviderList, setShowServiceProviderList] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [showTransactionList , setShowTransactions] = useState(false)

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowServiceProviderList(false);
    setShowBookingList(false);
    setShowTransactions(false)
  };

  const handleShowServiceProviderList = () => {
    setShowUserList(false);
    setShowServiceProviderList(true);
    setShowBookingList(false);
    setShowTransactions(false)
  };

  const handleShowBookingList = () => {
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(true);
    setShowTransactions(false)
  };

  const handleShowTransactionList = () =>{
    setShowUserList(false);
    setShowServiceProviderList(false);
    setShowBookingList(false);
    setShowTransactions(true)
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        onShowUserList={handleShowUserList} 
        onShowServiceProviderList={handleShowServiceProviderList} 
        onShowBookingList={handleShowBookingList} 
        onShowTransactionList={handleShowTransactionList}
      />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <DashboardMain 
          showUserList={showUserList} 
          showServiceProviderList={showServiceProviderList} 
          showBookingList={showBookingList}
          showTransactionList={showTransactionList}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
