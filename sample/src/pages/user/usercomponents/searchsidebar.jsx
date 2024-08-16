import React, { useState ,useContext} from 'react';
import '../../../style/sidebar.css'
import SearchContext from '../context/searchContext';


const SearchSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    console.log(`Checkbox ${value} is ${checked ? 'checked' : 'unchecked'}`);
    // Trigger the search or send a message here
    // For example:
    name: checked ? setSearchTerm(value) : setSearchTerm("") ;
   
  };


  return (
    <div id="mySidebar" className={`sidebar ${isOpen ? 'closed'  : ''}`}>
      <div className="sidebar-header">
        <h3>Filters</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="filter-section">
        <h4>Category</h4>
        <label>
          <input type="checkbox" name="category" value="engineer" onChange={handleCheckboxChange} />
          ENGINEERS
        </label>
        <label>
          <input type="checkbox" name="category" value="farmer"  onChange={handleCheckboxChange}  />
          FARMERS
        </label>
        <label>
          <input type="checkbox" name="category" value="option3" />
          LAWYERS
        </label>
      </div>
      <div className="filter-section">
        <h4>EXPERIENCE Range</h4>
        <label>
          <input type="radio" name="price" value="low" />
          Low
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
