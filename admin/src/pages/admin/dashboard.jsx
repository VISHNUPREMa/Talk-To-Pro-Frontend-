import React, { useState } from 'react';
import Sidebar from './sidebar';
import DashboardMain from './dashboardMain';
import AdminNavbar from './adminNavbar';

const AdminDashboard = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showServiceProviderList, setShowServiceProviderList] = useState(false);

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowServiceProviderList(false);
  };

  const handleShowServiceProviderList = () => {
    setShowUserList(false);
    setShowServiceProviderList(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onShowUserList={handleShowUserList} onShowServiceProviderList={handleShowServiceProviderList} />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <DashboardMain showUserList={showUserList} showServiceProviderList={showServiceProviderList} />
      </div>
    </div>
  );
}

export default AdminDashboard;
