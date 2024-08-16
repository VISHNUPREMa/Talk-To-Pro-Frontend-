import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import '../../style/userlist.css'

import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/allusers`);
      console.log("response : ", response);
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUnblockClick = async (email) => {
    try {
      const response = await axios.post(`${BACKEND_SERVER}/unblockuser`, { email });
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      const updatedUsers = userData.map(user => {
        if (user.email === email) {
          return { ...user, isBlocked: false };
        }
        return user;
      });
      setUserData(updatedUsers);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleBlockClick = async (email) => {
    try {
      const response = await axios.post(`${BACKEND_SERVER}/blockuser`, { email });
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Update userData to reflect the new blocked status
        const updatedUsers = userData.map(user => {
          if (user.email === email) {
            return { ...user, isBlocked: true };
          }
          return user;
        });
        setUserData(updatedUsers);
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  // Calculate the displayed users based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="table-responsive" style={{ marginTop: '50px',marginBottom:'20px' }}>
        <ToastContainer />
        <table className="table table-hover table-nowrap">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.profilePic && <img
                    src={`${BACKEND_SERVER}/public/${row.profilePic}`}
                    className="avatar avatar-sm rounded-circle me-2"
                  />}
                  <a className="text-heading font-semibold">
                    {row.username}
                  </a>
                </td>
                <td>{row.createdAt}</td>
                <td>{row.email}</td>
                <td>
                  <span className={`badge badge-lg ${row.isBlocked ? 'badge-dot text-danger' : 'badge-dot text-white'}`}>
                    <i className={`bi ${row.isBlocked ? 'bi-x-circle' : 'bi-check-circle'}`}></i>
                    <span className="fw-bold">
                      {row.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </span>
                </td>
                <td className="text-end">
                  <a className="btn btn-sm btn-neutral" onClick={() => row.isBlocked ? handleUnblockClick(row.email) : handleBlockClick(row.email)}>
                    {row.isBlocked ? 'Unblock' : 'Block'}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }, (_, index) => {
      const pageNumber = index + 1;

      // Show page numbers at the beginning, end, and around the current page
      if (
        pageNumber <= 2 || 
        pageNumber === Math.ceil(userData.length / itemsPerPage) || 
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
    {currentPage < Math.ceil(userData.length / itemsPerPage) && (
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

export default UserList;
