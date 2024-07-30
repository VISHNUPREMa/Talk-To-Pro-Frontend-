import React from 'react';
import { useNotification } from '../customhooks/notification-hook';
import Navbar from './navbar';
import Swal from 'sweetalert2';

const NotificationDetails = () => {
  const {singleNotification} = useNotification({});

  if (!singleNotification) {
    return <div>Loading...</div>;
  }

  const { date } = singleNotification._id;
  const { time, status, amount, bookedBy } = singleNotification.slots[0];
  const { providedBy } = singleNotification;

  const parseDateTime = (dateStr, timeStr) => {
    const combinedDateTime = `${dateStr} ${timeStr}`;
    return new Date(Date.parse(combinedDateTime));
  };

  const handleCall = async () => {
    try {
  
      const notificationDateTime = parseDateTime(date, time);
      const now = new Date();
  
      if (now.getTime() === notificationDateTime.getTime()) {
        console.log("The current date and time match the notification date and time.");
        navigator('/videocall');
      } else {
        console.log("The current date and time do not match the notification date and time.");
        Swal.fire({
          title: "The current date and time do not match the notification date and time.",
          text: "Please ensure you are trying to join the call at the scheduled time.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        });
      }
    } catch (error) {
      Swal.fire({
        title: "An error occurred",
        text: error.message || "Something went wrong while trying to handle the call.",
        icon: "error",
        confirmButtonText: 'OK',
      });
      console.error("Error in handleCall:", error);
    }
  };
  

  return (
  <div style={{ width: '100vw' }}>
    <div className="navbar-fixed">
        <Navbar />
      </div>
 
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleCall}>Call Now</button>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NotificationDetails;
