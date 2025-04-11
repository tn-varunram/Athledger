// src/pages/BookingPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchAvailableSlots, bookSlot, cancelSlot } from '../services/api';

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const [sport, setSport] = useState('Badminton');
  const [slotDetails, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSlots = async () => {
    try {
      setLoading(true);
      const data = await fetchAvailableSlots(sport, user.token);
      setSlots(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && sport) {
      getSlots();
    }
    // eslint-disable-next-line
  }, [sport]);

  const handleBook = async (slotId) => {
    try {
      await bookSlot(slotId, user.token);
      alert('Slot booked successfully!');
      getSlots(); // Refresh slot availability
    } catch (error) {
      console.error(error);
      alert('Booking failed. Please try again.');
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelSlot(bookingId, user.token);
      alert('Slot canceled successfully!');
      getSlots();
    } catch (error) {
      console.error(error);
      alert('Cancellation failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Book a Slot</h2>
      <label>Select Sport: </label>
      <select value={sport} onChange={(e) => setSport(e.target.value)}>
        <option value="Badminton">Badminton</option>
        <option value="Football">Football</option>
        <option value="Basketball">Basketball</option>
        {/* add more sports as needed */}
      </select>

      {loading ? <p>Loading slotDetails...</p> : null}

      <ul>
        {slotDetails.map((slot) => (
          <li key={slot.id}>
            <span>
              {slot.startTime} - {slot.endTime} 
              (Status: {slot.isBooked ? 'Booked' : 'Available'})
            </span>
            {!slot.isBooked ? (
              <button onClick={() => handleBook(slot.id)}>Book</button>
            ) : (
              <button onClick={() => handleCancel(slot.bookingId)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;
