import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../instance/axiosInstance.jsx';
import { useData } from '../../contexts/userDataContext.jsx';
import { BACKEND_SERVER } from '../../../secrets/secret.js';
import '../../../style/userbooking.css';
import Navbar from './navbar.jsx';

function UserTransactions() {
    const { user } = useData();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const userId = user.userid;
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.post(`${BACKEND_SERVER}/transaction`, { userId });
                if (response.data) {
                    setTransactions(response.data.data);
                } else {
                    console.error('Failed to fetch transactions');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, [user.userid]);


    return (
        <div style={{ width: '100vw'}}>
            <div className="navbar-fixed">
                <Navbar />
            </div>
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
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.time}</td>
                                    <td>{transaction.fromUsername}</td>
                                    <td>{transaction.toUsername}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.modeOfPay}</td>
                                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    );
}

export default UserTransactions;
