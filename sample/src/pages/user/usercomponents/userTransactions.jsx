import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../instance/axiosInstance';
import { useData } from '../../contexts/userDataContext';
import { BACKEND_SERVER } from '../../../secrets/secret.JS';
import '../../../style/userbooking.css';

function UserTransactions() {
    const { user } = useData();

    useEffect(()=>{
        const userId = user.userid;
        const availableTransaction = async() =>{
            try {
                const response = await axiosInstance.post(`${BACKEND_SERVER}/transaction`, { userId });
            } catch (error) {
                
            }

        }

        availableTransaction()

    },[])

     
    return (
        <div className="user-booking">
          <h1>Your Transactions</h1>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap" id='table'>
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                  <th>Mode</th>
                  <th>At</th>
                </tr>
              </thead>
              <tbody>
     
    </tbody>
    
            </table>
          </div>
        </div>
      );
}

export default UserTransactions
