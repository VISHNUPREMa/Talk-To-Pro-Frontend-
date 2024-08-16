import React from 'react';
import '../../style/adminNavbar.css';
import {useNavigate} from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate()

  const handleAdminLogout = async(e) =>{
    e.preventDefault();
    try {
       document.cookie = "adminaccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       localStorage.removeItem('adminrefreshToken');
      navigate("/admin")
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="admin-navbar">
      <div className="flex items-center">
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>

      <button className="logout-btn" onClick={handleAdminLogout}>
              Logout
            </button>
      
      <div className="flex items-center">
        <img src="../profile.png" alt="Admin Logo" className="admin-logo" />
      </div>
    </div>
  );
}

export default AdminNavbar;


