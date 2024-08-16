import React, { useState, useEffect } from 'react';
import UserList from './userList';
import ProList from './proList';
import BookingList from './bookingList';
import TransactionList from './transactionList';
import ProRequestList from './proRequests';
import BarCharts from './barchart';
import PieActiveArc from './piechart';

const DashboardMain = ({ showUserList, showServiceProviderList, showBookingList, showTransactionList, showProRequestsList }) => {
  const [isAnyListVisible, setIsAnyListVisible] = useState(false);

  useEffect(() => {
    // Check if any list is visible and update the state accordingly
    if (showUserList || showServiceProviderList || showBookingList || showTransactionList || showProRequestsList) {
      setIsAnyListVisible(true);
    } else {
      setIsAnyListVisible(false);
    }
  }, [showUserList, showServiceProviderList, showBookingList, showTransactionList, showProRequestsList]);

  return (
    <div className="flex-1 p-4" style={{ backgroundColor: 'linear-gradient(90deg, #C7C5F4, #776BCC)' }}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      
      {!isAnyListVisible && (
        <>
          <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
            <BarCharts />
          </div>
          <div style={{ backgroundColor: 'white', marginTop: '50px', width: '700px', borderRadius: '10px' }}>
            <PieActiveArc />
          </div>
        </>
      )}

      {showUserList && <UserList />}
      {showServiceProviderList && <ProList />}
      {showBookingList && <BookingList />}
      {showTransactionList && <TransactionList />}
      {showProRequestsList && <ProRequestList />}
    </div>
  );
}

export default DashboardMain;
