import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/allusers`);
      console.log("response : ", response);
      setUserData(response.data); // Assuming your API returns an array of users
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

  return (
    <div className="table-responsive" style={{ marginTop: '50px' }}>
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
          {userData.map((row, index) => (
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
  );
};

export default UserList;

