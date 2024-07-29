import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingList = () => {
  const [bookingData, setBookingData] = useState([]);


  useEffect(() => {
    fetchBookingData();
   
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/allbooking`);
      const datas = response.data.data;
      console.log("datas : ", datas);

      

      setBookingData(datas);
    
    } catch (error) {
      console.error('Error fetching booking data:', error);
      toast.error('Error fetching booking data');
    }
  };


   



  return (
    <div className="table-responsive" style={{ marginTop: '50px' }}>
      <ToastContainer />
      <table className="table table-hover table-nowrap">
        <thead className="thead-light">
          <tr>
            <th scope="col">BookedBy</th>
            <th scope="col">Mentor</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((row, index) => (
            <tr key={index}>
              <td>
                <a className="text-heading font-semibold" href="#">
                  {row.bookedBy}
                </a>
              </td>
              <td>{row.providedBy}</td>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td >{row.amount || '500'}</td> 
              <td>
              <span className={`badge badge-lg ${row.status === 'Booked' ? 'badge-dot text-success' : 'badge-dot text-white'}`}>
  <i className={`bi ${row.status === 'Booked' ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
  <span className="fw-bold">
    {row.status}
  </span>
</span>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
