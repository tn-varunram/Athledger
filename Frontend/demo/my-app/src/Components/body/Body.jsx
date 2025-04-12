import React, { useState, useEffect } from 'react';
import createRequest from '../../api/request';
import sportsImg from './../../assets/sports.jpg';
import SlotBookingModal from './SlotBookingModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingComponent = ({ bookings, onCancel }) => {
  return (
    <table style={{ width: '100%', backgroundColor: '#fff', color: '#000', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
      <thead>
        <tr style={{ backgroundColor: '#333', color: '#fff', textAlign: 'left' }}>
          <th style={{ padding: '12px' }}>Status</th>
          <th style={{ padding: '12px' }}>Sport</th>
          <th style={{ padding: '12px' }}>Facility</th>
          <th style={{ padding: '12px' }}>Date</th>
          <th style={{ padding: '12px' }}>Time</th>
          <th style={{ padding: '12px' }}>Booking Status</th>
          <th style={{ padding: '12px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => {
          const bookingDate = new Date(booking.bookingdate);
          const today = new Date();
          const isPast = booking.bookingstatus === 'CANCELLED' || bookingDate < today;
          const label = isPast ? 'PAST' : 'UPCOMING';
          const labelColor = isPast ? '#bbb' : '#4CAF50';
          const rowBg = isPast ? '#ffe5e5' : '#e6ffe6';

          return (
            <tr key={index} style={{ backgroundColor: rowBg, borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: labelColor }}>{label}</td>
              <td style={{ padding: '12px' }}>{booking.sport}</td>
              <td style={{ padding: '12px' }}>{booking.facility}</td>
              <td style={{ padding: '12px' }}>{booking.bookingdate}</td>
              <td style={{ padding: '12px' }}>{booking.bookingfrom} - {booking.bookingto}</td>
              <td style={{ padding: '12px' }}>{booking.bookingstatus}</td>
              <td style={{ padding: '12px' }}>
                {!isPast && booking.bookingstatus === 'BOOKED' && (
                  <button onClick={() => onCancel(booking.bookingid)}>Cancel</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    padding: '32px',
    minHeight: 'calc(100vh - 100px)',
    color: 'white',
    backgroundImage: `url(${sportsImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  left: {
    width: '250px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '24px',
    borderRadius: '10px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  right: {
    flex: 1,
    marginLeft: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '24px',
    borderRadius: '10px',
    zIndex: 2,
    maxHeight: '80vh',         // ✅ limit height
    overflowY: 'auto',         // ✅ enable vertical scroll inside this box
  }
  ,
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    alignItems: 'center',
  },
  select: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
  },
  datePicker: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
  },
  timeslot: {
    backgroundColor: '#4CAF50',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '6px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
};

const Body = () => {
  const [sports, setSports] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [view, setView] = useState('book');

  const slotMgmtRequest = createRequest('http://localhost:8081');
  const slotBookingRequest = createRequest('http://localhost:8082');

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('athledgerToken');
      setIsLoggedIn(!!token);
  
      if (token) {
        slotMgmtRequest.get('/user/sports')
          .then(res => setSports(res.data))
          .catch(console.error);
  
        fetchMyBookings();
      } else {
        setSports([]);
        setMyBookings([]);
      }
    };
  
    checkToken(); // initial check
    window.addEventListener('storage', checkToken); // react to logout in other tabs or manually
  
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);
  

  useEffect(() => {
    if (!selectedSport || !selectedDate) return;
    setLoadingSlots(true);
    slotMgmtRequest.get(`/user/slots/by-sport?sportid=${selectedSport}&date=${selectedDate}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => a.start.localeCompare(b.start));
        setSlots(sorted);
      })
      .catch(console.error)
      .finally(() => setLoadingSlots(false));
  }, [selectedSport, selectedDate]);

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const confirmBooking = () => {
    const payload = {
      bookingdate: selectedSlot.date,
      bookingfrom: selectedSlot.start,
      bookingto: selectedSlot.end,
      sport: selectedSlot.sport,
      facility: selectedSlot.facility,
      slotid: selectedSlot.slotid,
      userid: getUserFromToken(),
    };

    slotBookingRequest.post('/booking/create', payload)
      .then(() => {
        toast.success('Booking successful');
        setShowModal(false);
        refreshSlots();
        fetchMyBookings();
      })
      .catch(err => {
        toast.error('Booking failed');
        console.error(err);
      });
  };

  const cancelBooking = (bookingid) => {
    slotBookingRequest.post(`/booking/cancel/${bookingid}`)
      .then(() => {
        toast.info('Booking cancelled');
        refreshSlots();
        fetchMyBookings();
      })
      .catch(err => {
        toast.error('Cancellation failed');
        console.error(err);
      });
  };

  const refreshSlots = () => {
    if (!selectedSport || !selectedDate) return;
    setLoadingSlots(true);
    slotMgmtRequest.get(`/user/slots/by-sport?sportid=${selectedSport}&date=${selectedDate}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => a.start.localeCompare(b.start));
        setSlots(sorted);
      })
      .finally(() => setLoadingSlots(false));
  };

  const fetchMyBookings = () => {
    const user = getUserFromToken();
    if (!user) return;
    setLoadingBookings(true);
    slotBookingRequest.get(`/booking/user/${user}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.bookingdate) - new Date(a.bookingdate));
        setMyBookings(sorted);
      })
      .finally(() => setLoadingBookings(false));
  };

  const getUserFromToken = () => {
    const token = localStorage.getItem('athledgerToken');
    if (!token) return null;
    try {
      const { sub } = JSON.parse(atob(token.split('.')[1]));
      return sub;
    } catch {
      return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        position: 'relative',
        height: 'calc(100vh - 100px)',
        backgroundImage: `url(${sportsImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        Please log in to view and book slots.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.left}>
        <button onClick={() => setView('book')}>Book a New Slot</button>
        <button onClick={() => setView('mybookings')}>My Bookings</button>
      </div>
      <div style={styles.right}>
        {view === 'book' ? (
          <>
            <h2>Book a Slot</h2>
            <div style={styles.row}>
              <select
                id="sport-select"
                style={styles.select}
                onChange={(e) => setSelectedSport(e.target.value)}
                value={selectedSport}
              >
                <option value="">-- Choose a sport --</option>
                {sports.map((sport) => (
                  <option key={sport.sportid} value={sport.sportid}>{sport.sport}</option>
                ))}
              </select>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={styles.datePicker}
              />
            </div>
            {selectedSport && selectedDate && (
              <div style={{ marginTop: '24px' }}>
                <h3>Available Time Slots</h3>
                {loadingSlots ? <p>Loading slots...</p> : (
                  slots.map((slot, index) => (
                    <div key={index} style={styles.timeslot} onClick={() => handleBookSlot(slot)}>
                      {slot.start} – {slot.end}
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <h3>My Bookings</h3>
            {loadingBookings ? (
  <p>Loading bookings...</p>
) : (
  <BookingComponent bookings={myBookings} onCancel={cancelBooking} />
)}

          </>
        )}
      </div>
      {showModal && selectedSlot && (
        <SlotBookingModal
          slot={selectedSlot}
          onConfirm={confirmBooking}
          onClose={() => setShowModal(false)}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Body;
