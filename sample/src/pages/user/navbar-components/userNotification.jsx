import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../style/notification.css';
import { useData } from '../../contexts/userDataContext';
import axiosInstance from '../../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../../secrets/secret';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../customhooks/notification-hook';

const UserNotification = () => {
 const {setSingleNotification} = useNotification({})
  const navigate = useNavigate();
  const { user } = useData();
  const [notificationsVisible, setNotificationsVisible] = useState(true);
  const [messagesVisible, setMessagesVisible] = useState(true);
  const [notificationData, setNotificationData] = useState([]);

  const handleToggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const handleToggleMessages = () => {
    setMessagesVisible(!messagesVisible);
  };

  useEffect(() => {
    const id = user.userid;
    const fetchNotification = async () => {
      try {
        const response = await axiosInstance.post(`${BACKEND_SERVER}/notification`, { id });
        if (response.data.success) {
          console.log("response : ", response.data.data);
          setNotificationData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotification();
  }, [user]);

  const handleSelectedNotification = async (notification) => {
    setSingleNotification(notification);
    navigate('/singlenotification');
  };

  return (
    <div className="relative" id="notifications">
      {notificationsVisible && (
        <div className="absolute left z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-2 ring-gray-900/6 bg-gradient-to-r from-gray-50 to-blue-100">
            <div className="p-4">
              <button
                type="button"
                className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                aria-expanded="false"
                onClick={handleToggleMessages}
              >
                <i className="fa-solid fa-bell fa-shake"></i> <span>Notifications</span>
                <i className="fa-solid fa-chevron-down text-gray-600 group-hover:text-indigo-600 animate-bounce"></i>
              </button>
              {messagesVisible && (
                <div id="messages">
                  {notificationData.map((notification, index) => (
                    <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-200" onClick={() => handleSelectedNotification(notification)}>
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <i className={`fa-solid ${notification.providedBy === user.username ? 'fa-arrow-right-to-bracket' : 'fa-envelope'} fa-xl text-gray-600 group-hover:text-indigo-600`}></i>
                      </div>
                      <div>
                        <a href="#" className="font-semibold text-gray-900">
                          {notification.providedBy === user.username ? `Slot booked by ${notification.bookedBy}` : `You booked a slot with ${notification.providedBy}`} <span className="text-xs text-gray-400 animate-pulse">{new Date(notification.date).toLocaleTimeString()}</span>
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="mt-1 text-gray-600">
                          {notification.providedBy === user.username ? `${notification.bookedBy} booked slot at ${notification.time}` : `You booked slot at ${notification.time} with ${notification.providedBy}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-100">
                <button
                  onClick={handleToggleMessages}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-blue-200"
                  id="toggleButton"
                >
                  <i className="fa-solid fa-broom"></i> {messagesVisible ? 'Clear' : 'Undo'}
                </button>
                <button
                  onClick={handleToggleNotifications}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-blue-200"
                  id="closeButton"
                >
                  <i className="fa-regular fa-circle-xmark"></i> {notificationsVisible ? 'Close' : 'Show Notifications'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
