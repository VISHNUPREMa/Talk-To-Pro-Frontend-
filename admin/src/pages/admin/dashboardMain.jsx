import React from 'react';
import UserList from './userList';
import ProList from './proList';


const DashboardMain = ({ showUserList, showServiceProviderList }) => {
  return (
    <div className="flex-1 p-4" style={{ backgroundColor: 'linear-gradient(90deg, #C7C5F4, #776BCC)' }}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'black' }}>User Statistics</h3>
          {/* Add chart or statistics component here */}
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'black' }}>Service Provider Statistics</h3>
          {/* Add chart or statistics component here */}
        </div>
      </div>

      {showUserList && <UserList />}
      {showServiceProviderList && <ProList/>}
    </div>
  );
}

export default DashboardMain;
