import React, { useState } from 'react';
import '../../style/sidebar.css';

const Sidebar = ({ onShowUserList, onShowServiceProviderList }) => {
  const [showUserList, setShowUserList] = useState(true);
  const [showServiceProviderList, setShowServiceProviderList] = useState(false);

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowServiceProviderList(false);
    onShowUserList(); 
  };

  const handleShowServiceProviderList = () => {
    setShowUserList(false);
    setShowServiceProviderList(true);
    onShowServiceProviderList(); // Trigger the parent logic
  };

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
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
