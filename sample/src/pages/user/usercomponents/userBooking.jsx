import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../instance/axiosInstance';
import '../../../style/userbooking.css';
import { useData } from '../../contexts/userDataContext';
import { BACKEND_SERVER } from '../../../secrets/secret.js';
import Navbar from './navbar';

const UserBooking = () => {
  const { user } = useData();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = user.userid;
    const availableBookings = async () => {
      try {
        const response = await axiosInstance.post(`${BACKEND_SERVER}/userbooking`, { userId });
        if (response.data.success) {
         
          setBookings(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    availableBookings();
  }, [user]);

  
  return (
    <div style={{width:'100vw'}}>
    <div className="navbar-fixed">
        <Navbar />
      </div>
  
    <div className="user-booking">
      <h1>Your Bookings</h1>
      <div className="table-responsive">
        <table className="table table-hover table-nowrap" id='table'>
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Mentor</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
  {bookings.map((book, index) => {
    const formattedDate = new Date(book.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    
    return (
      <tr key={index}>
        <td>{formattedDate}</td>
        <td>{book.slots.time}</td>
        <td>{book.providedByUsername}</td>
        
        <td>
        <span
  className={`badge badge-lg ${book.slots.status === 'Booked' ? 'badge-dot text-success' : 'badge-dot text-danger'}`} 
>
  <i className={`bi ${book.slots.status === 'Booked' ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
  <span className="fw-bold">
    {book.slots.status}
  </span>
</span>

        </td>
        <td>{book.slots.amount}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
    </div>
  );
};

export default UserBooking;
