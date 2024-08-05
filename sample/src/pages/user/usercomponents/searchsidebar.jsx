import React, { useState } from 'react';
import '../../../style/sidebar.css'


const SearchSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="mySidebar" className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header">
        <h3>Filters</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="filter-section">
        <h4>Category</h4>
        <label>
          <input type="checkbox" name="category" value="option1" />
          Option 1
        </label>
        <label>
          <input type="checkbox" name="category" value="option2" />
          Option 2
        </label>
        <label>
          <input type="checkbox" name="category" value="option3" />
          Option 3
        </label>
      </div>
      <div className="filter-section">
        <h4>Price Range</h4>
        <label>
          <input type="radio" name="price" value="low" />
          Low
        </label>
        <label>
          <input type="radio" name="price" value="medium" />
          Medium
        </label>
        <label>
          <input type="radio" name="price" value="high" />
          High
        </label>
      </div>
      <div className="filter-section">
        <h4>Ratings</h4>
        <label>
          <input type="checkbox" name="ratings" value="4stars" />
          4 Stars & Up
        </label>
        <label>
          <input type="checkbox" name="ratings" value="3stars" />
          3 Stars & Up
        </label>
        <label>
          <input type="checkbox" name="ratings" value="2stars" />
          2 Stars & Up
        </label>
      </div>
    </div>
  );
};

export default SearchSidebar;
