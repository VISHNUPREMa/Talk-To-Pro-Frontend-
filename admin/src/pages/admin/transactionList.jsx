import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionList = () => {
    const [transactionData , setTransactionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
  
    
  useEffect(() => {
    fetchTransactionData();
   
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/alltransaction`);
      const datas = response.data.data

      setTransactionData(datas)

      

      
    
    } catch (error) {
      console.error('Error fetching booking data:', error);
      toast.error('Error fetching booking data');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = transactionData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>
    <div className="table-responsive" style={{ marginTop: '50px' }}>
      <ToastContainer />
      <table className="table table-hover table-nowrap">
        <thead className="thead-light">
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount</th>
            <th scope="col">Slot Date</th>
            <th scope="col">Slot Time</th>
            <th scope="col">Mode of Pay</th>
            <th scope="col">Transaction Time</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((row, index) => (
            <tr key={index}>
              <td>
                <a className="text-heading font-semibold" href="#">
                  {row.fromBy}
                </a>
              </td>
              <td>{row.toBy}</td>
              <td>{row.amount}</td>
              <td>{row.date}</td>
              <td >{row.time}</td> 
              <td >{row.modeOfPay}</td> 
              <td >{row.updatedAt}</td> 
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
    {Array.from({ length: Math.ceil(transactionData.length / itemsPerPage) }, (_, index) => {
      const pageNumber = index + 1;

      // Show page numbers at the beginning, end, and around the current page
      if (
        pageNumber <= 2 || 
        pageNumber === Math.ceil(transactionData.length / itemsPerPage) || 
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
    {currentPage < Math.ceil(transactionData.length / itemsPerPage) && (
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

export default TransactionList;