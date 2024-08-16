import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'



const ProRequestList = () => {
    const navigate = useNavigate()
    
    const [proRequest, setproRequest] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
  
    useEffect(() => {
      fetchproRequest();
    }, []);
  
    const fetchproRequest = async () => {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/allprorequset`);
        console.log("response : ", response);
        setproRequest(response.data.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
  
  
   
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = proRequest.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleProRequestDetails = async() => {
        try {
            navigate("/admin/prorequestdetails", { state: { proRequest } });

        } catch (error) {
           console.log(error);
            
        }
    }
  
  
    return (
      <>
      {proRequest.length > 0 ? (<div className="table-responsive" style={{ marginTop: '50px' }}>
        <ToastContainer />
        <table className="table table-hover table-nowrap">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Profession</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((row, index) => (
              <tr key={index}>
                <td>
                  <img
                    alt="..."
                    src={`${BACKEND_SERVER}/public/${row.profilePic}`}
                    className="avatar avatar-sm rounded-circle me-2"
                  />
                  <a className="text-heading font-semibold" href="#">
                    {row.username}
                  </a>
                </td>
                <td>{row.profession}</td>
                <td>{row.email}</td>
                <button style={{backgroundColor:'white',marginTop:'5px'}}  onClick={handleProRequestDetails}>View More</button>
               
              </tr>
            ))}
          </tbody>
          <h2></h2>
        </table>
      </div>):(<h2>No Request</h2>)}
  
  
      <nav className="pagination-nav">
    <ul className="pagination justify-content-center">
      {/* Previous Button */}
      {currentPage > 1 && (
        <li className="page-item">
          <a onClick={() => paginate(currentPage - 1)} className="page-link text-black">
            Previous
          </a>
        </li>
      )}
      
      {/* Page Numbers */}
      {Array.from({ length: Math.ceil(proRequest.length / itemsPerPage) }, (_, index) => {
        const pageNumber = index + 1;
  
        // Show page numbers at the beginning, end, and around the current page
        if (
          pageNumber <= 2 || 
          pageNumber === Math.ceil(proRequest.length / itemsPerPage) || 
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <li key={index} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
              <a onClick={() => paginate(pageNumber)} className="page-link text-black">
                {pageNumber}
              </a>
            </li>
          );
        }
  
        // Show ellipsis for omitted pages
        if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
          return <li key={index} className="page-item"><span className="page-link">...</span></li>;
        }
  
        return null;
      })}
  
      {/* Next Button */}
      {currentPage < Math.ceil(proRequest.length / itemsPerPage) && (
        <li className="page-item">
          <a onClick={() => paginate(currentPage + 1)} className="page-link text-black">
            Next
          </a>
        </li>
      )}
    </ul>
  </nav>
  </>
    );
  };
  
  export default ProRequestList;
  