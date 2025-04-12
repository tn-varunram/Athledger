import React from 'react';

const SlotBookingModal = ({ slot, onConfirm, onClose }) => {
  return (
    <div style={{ ...modalStyle }}>
      <h3>Confirm Booking</h3>
      <p><strong>Sport:</strong> {slot.sport}</p>
      <p><strong>Facility:</strong> {slot.facility}</p>
      <p><strong>Date:</strong> {slot.date}</p>
      <p><strong>Time:</strong> {slot.start} – {slot.end}</p>
      <button onClick={onConfirm}>Confirm Booking</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

const modalStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '20px',
  borderRadius: '10px',
  position: 'fixed',
  top: '30%',
  left: '35%',
  zIndex: 1000
};

export default SlotBookingModal;
