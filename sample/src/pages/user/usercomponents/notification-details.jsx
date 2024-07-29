import React from 'react';
import UseNotification from '../customhooks/notification-hook'; // Adjust the import path as needed

const NotificationDetails = () => {
  const [singleNotification] = UseNotification();

  if (!singleNotification) {
    return <div>Loading...</div>;
  }

  // Extract notification details
  const { date } = singleNotification._id;
  const { time, status, amount, bookedBy } = singleNotification.slots[0];
  const { providedBy } = singleNotification;

  const handleCall = () => {
    console.log("Notification in handleCall:", singleNotification);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Notification Details</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3">Slot Details</h2>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Amount:</strong> {amount}</p>
            <p><strong>Booked By:</strong> {bookedBy}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3">Provided By</h2>
            <p>{providedBy}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-3">Date</h2>
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
          <button onClick={handleCall}>Call Now</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
