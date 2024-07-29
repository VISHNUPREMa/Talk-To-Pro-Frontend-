import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'; 
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionList = () => {
    const [transactionData , setTransactionData] = useState([])
  
    
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

   



  return (
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
          {transactionData.map((row, index) => (
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
  );
};

export default TransactionList;