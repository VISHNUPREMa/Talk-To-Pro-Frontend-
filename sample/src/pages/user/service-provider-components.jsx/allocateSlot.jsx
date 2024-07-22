import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import '../../../style/slotbooking.css';
import axiosInstance from '../../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../../secrets/secret.JS';
import { useData } from '../../contexts/userDataContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ServiceProviderBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [fetchedSlots, setFetchedSlots] = useState([]);
  const [cashAmount, setCashAmount] = useState(0);

  const { user } = useData();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const proId = user.userid;
        const response = await axiosInstance.post(`${BACKEND_SERVER}/bookedslot`, { proId });
        if (response.data.success) {
          console.log("response : ", response.data.data);
          setFetchedSlots(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    fetchAvailableSlots();
  }, [user.userid]);

  useEffect(() => {
    if (fetchedSlots.length > 0) {
      updateAvailableSlots(fetchedSlots, selectedDate);
    }
  }, [selectedDate, fetchedSlots]);

  const updateAvailableSlots = (slots, date) => {
    const dateString = date.toISOString().split('T')[0];
    const slotsForDate = slots.find(slot => slot.date.startsWith(dateString));
    setAvailableSlots(slotsForDate ? slotsForDate.slots.map(s => s.time) : []);
  };

  const dates = Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i));

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotToggleWithConfirmation = (slot) => {
    if (availableSlots.includes(slot)) {
      MySwal.fire({
        title: 'Are you sure?',
        text: `Do you want to unallocate the slot at ${slot}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unallocate it!',
        cancelButtonText: 'No, keep it',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          setAvailableSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
          MySwal.fire({
            title: 'Unallocated!',
            text: 'The slot has been unallocated.',
            icon: 'success',
            customClass: {
              popup: 'swal2-popup',
              title: 'swal2-title',
              content: 'swal2-content',
              confirmButton: 'swal2-confirm',
            }
          });
        }
      });
    } else {
      setAvailableSlots((prevSlots) => [...prevSlots, slot]);
    }
  };

  

  const saveAvailableSlots = async () => {
    try {
      const id = user.userid;
  
      if (selectedDate < Date.now()) {
        MySwal.fire({
          title: 'Invalid Date',
          text: 'The selected date is in the past. Please choose a valid date.',
          icon: 'error',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
          }
        });
        return;
      }
  
      if (cashAmount < 100 || cashAmount > 5000) {
        MySwal.fire({
          title: 'Out of Price Range',
          text: 'The amount should be between 100 and 5000.',
          icon: 'error',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
          }
        });
        return;
      }
  
      const response = await axiosInstance.post(`${BACKEND_SERVER}/saveAvailableSlots`, {
        date: selectedDate.toISOString(),
        slots: availableSlots,
        id: id,
        amount: cashAmount
      });
  
      if (response.data.success) {
        MySwal.fire({
          title: 'Success!',
          text: 'Available slots and amounts saved successfully!',
          icon: 'success',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
          }
        });
  
        // Update the fetchedSlots state to include the new slots
        setFetchedSlots((prevSlots) => {
          const dateString = selectedDate.toISOString().split('T')[0];
          const updatedSlots = prevSlots.map(slot =>
            slot.date.startsWith(dateString)
              ? { ...slot, slots: availableSlots.map(time => ({ time })) }
              : slot
          );
          return updatedSlots;
        });
      }
    } catch (error) {
      console.error('Error saving available slots:', error);
      MySwal.fire({
        title: 'Error!',
        text: 'There was an error saving the available slots. Please try again.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm',
        }
      });
    }
  };
  


  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Allocate Your Available Slots</h2>
        <div id="date-div">
          <div className="flex justify-between items-center mb-8">
            <button className="text-lg" onClick={() => setSelectedDate(subDays(selectedDate, 7))}>
              &larr;
            </button>
            <div className="flex space-x-4">
              {dates.map((date, index) => (
                <button
                  key={index}
                  className={`p-4 rounded ${date.toDateString() === selectedDate.toDateString() ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleDateChange(date)}
                >
                  {format(date, 'EEE dd MMM')}
                </button>
              ))}
            </div>
            <button className="text-lg" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
              &rarr;
            </button>
          </div>
        </div>
  
        <div className="mb-8" style={{marginTop:"30px",marginBottom:'20px'}}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cashAmount">
            Set Cash Amount for Selected Date:
          </label>
          <input
            type="number"
            id="cashAmount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
          />
        </div>
  
        <div className="grid grid-cols-4 gap-4 mb-8" style={{ marginTop: '40px' }}>
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`p-3 rounded ${availableSlots.includes(slot) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleTimeSlotToggleWithConfirmation(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
  
        <div className="flex justify-between items-center mt-4">
          <div id="legend" className="flex flex-col">
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 bg-gray-200 mr-2"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span>Available</span>
            </div>
          </div>
  
          <div id="save-btn">
            <button className="bg-yellow-500 text-white py-3 px-6 rounded text-lg" onClick={saveAvailableSlots}>Save Slots</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ServiceProviderBooking;
