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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = bookingData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   



  return (
    <>
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
          {currentUsers.map((row, index) => (
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
    {Array.from({ length: Math.ceil(bookingData.length / itemsPerPage) }, (_, index) => {
      const pageNumber = index + 1;

      // Show page numbers at the beginning, end, and around the current page
      if (
        pageNumber <= 2 || 
        pageNumber === Math.ceil(bookingData.length / itemsPerPage) || 
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
    {currentPage < Math.ceil(bookingData.length / itemsPerPage) && (
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

export default BookingList;
