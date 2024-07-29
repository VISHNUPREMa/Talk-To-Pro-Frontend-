import React from 'react';
import UserList from './userList';
import ProList from './proList';
import BookingList from './bookingList';
import TransactionList from './transactionList';


const DashboardMain = ({ showUserList, showServiceProviderList , showBookingList , showTransactionList }) => {
  return (
    <div className="flex-1 p-4" style={{ backgroundColor: 'linear-gradient(90deg, #C7C5F4, #776BCC)' }}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      

      {showUserList && <UserList />}
      {showServiceProviderList && <ProList/>}
      {showBookingList && <BookingList/>}
      {showTransactionList && <TransactionList/>}
    </div>
  );
}

export default DashboardMain;
