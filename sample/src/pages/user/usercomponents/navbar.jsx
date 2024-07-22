import React, { useState, useEffect, useContext } from 'react';
import { Menu } from 'lucide-react';
import '../../../style/navbar.css';
import { useNavigate } from 'react-router-dom';
import '../../../../public/profile.png';
import SearchContext from '../context/searchContext';
import SideMenu from './sideMenu';
import { AuthContext } from './jwtAuthContext';
import { useData } from '../../contexts/userDataContext';

const Navbar = () => {
  const { setUser: setGlobalUser } = useData();
  const navigate = useNavigate();
  const { setToken, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };     
  
  const handleLogout = () => {

    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    localStorage.removeItem('refreshToken');
  
    setGlobalUser(null);
    setIsAuthenticated(false);
  
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <span className="title">Talk to Pro</span>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Search for mentors"
            className="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="profile-icon">
            <img src="../../../../profile.png" alt="Profile" className="profile-pic" />
          </div>
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
          <div className="menu-icon" onClick={toggleSideMenu}>
            <Menu className="icon" />
          </div>
        </div>
      </div>
      <SideMenu isOpen={isSideMenuOpen} toggleSideMenu={toggleSideMenu} />
    </div>
  );
};

export default Navbar;
