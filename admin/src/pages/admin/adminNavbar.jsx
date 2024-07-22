import React from 'react';
import '../../style/adminNavbar.css';

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="flex items-center">
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>
      
      <div className="flex items-center">
        <img src="../profile.png" alt="Admin Logo" className="admin-logo" />
      </div>
    </div>
  );
}

export default AdminNavbar;


