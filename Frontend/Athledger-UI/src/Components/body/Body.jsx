import React, { useState, useEffect } from 'react';
import createRequest from '../../api/request';
import sportsImg from './../../assets/sports.jpg';
import SlotBookingModal from './SlotBookingModal';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Segment, Button, Dropdown, Header, Table, Loader, Icon, Modal, Form } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';

const BookingComponent = ({ bookings, onCancel, isAdmin }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Sport</Table.HeaderCell>
        <Table.HeaderCell>Facility</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        {!isAdmin && <Table.HeaderCell>Actions</Table.HeaderCell>}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {bookings.map((booking, index) => {
        const bookingDate = new Date(booking.bookingdate);
        const today = new Date();
        const isPast = booking.bookingstatus === 'CANCELLED' || bookingDate < today;
        const rowBg = isPast ? '#ffe5e5' : '#e6ffe6';
        return (
          <Table.Row key={index} style={{ backgroundColor: rowBg }}>
            <Table.Cell>{booking.userid}</Table.Cell>
            <Table.Cell>{booking.sport}</Table.Cell>
            <Table.Cell>{booking.facility}</Table.Cell>
            <Table.Cell>{booking.bookingdate}</Table.Cell>
            <Table.Cell>{booking.bookingfrom} - {booking.bookingto}</Table.Cell>
            <Table.Cell>{booking.bookingstatus}</Table.Cell>
            {!isAdmin && (
              <Table.Cell>
                {booking.bookingstatus === 'BOOKED' && (
                  <Button negative size='small' onClick={() => onCancel(booking.bookingid)}>Cancel</Button>
                )}
              </Table.Cell>
            )}
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);

const Body = ({ loggedIn, role }) => {
  const [sports, setSports] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [view, setView] = useState('book');
  const [userRole, setUserRole] = useState([]);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    sportid: '',
    facility: '',
    date: ''
  });
  
  const [showAddSportModal, setShowAddSportModal] = useState(false);
  const [newSport, setNewSport] = useState({
    sportid: '',
    sport: '',
    facility: '',
    capacity: '',
    sfid: ''
  });

  const slotMgmtRequest = createRequest('http://localhost:8081');
  const slotBookingRequest = createRequest('http://localhost:8082');

  useEffect(() => {
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [loggedIn, role]);

  useEffect(() => {
    if (isLoggedIn) {
      slotMgmtRequest.get(`/${role.toLowerCase()}/sports`).then(res => setSports(res.data)).catch(console.error);
      fetchMyBookings();
      if (role === 'ADMIN') fetchAllBookings();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!selectedSport || !selectedDate) return;
    setLoadingSlots(true);
    slotMgmtRequest.get(`/${role.toLowerCase()}/slots/by-sport?sportid=${selectedSport}&date=${selectedDate}`)
      .then(res => setSlots(res.data.sort((a, b) => a.start.localeCompare(b.start))))
      .catch(console.error)
      .finally(() => setLoadingSlots(false));
  }, [selectedSport, selectedDate]);

  const fetchMyBookings = () => {
    const user = getUserFromToken();
    if (!user) return;
    setLoadingBookings(true);
    slotBookingRequest.get(`/booking/user/${user}`)
      .then(res => setMyBookings(res.data.sort((a, b) => new Date(b.bookingdate) - new Date(a.bookingdate))))
      .finally(() => setLoadingBookings(false));
  };

  const fetchAllBookings = () => {
    slotBookingRequest.get('/admin/booking/')
      .then(res => setAllBookings(res.data))
      .catch(console.error);
  };

  const getUserFromToken = () => {
    const token = localStorage.getItem('athledgerToken');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1])).sub;
    } catch {
      return null;
    }
  };

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
    slotBookingRequest.post('/booking/create', payload).then(() => {
      toast.success('Booking successful');
      setShowModal(false);
      refreshSlots();
      fetchMyBookings();
    }).catch(err => toast.error('Booking failed'));
  };

  const refreshSlots = () => {
    if (!selectedSport || !selectedDate) return;
    setLoadingSlots(true);
    slotMgmtRequest.get(`/user/slots/by-sport?sportid=${selectedSport}&date=${selectedDate}`)
      .then(res => setSlots(res.data.sort((a, b) => a.start.localeCompare(b.start))))
      .finally(() => setLoadingSlots(false));
  };

  const cancelBooking = (id) => {
    slotBookingRequest.post(`/booking/cancel/${id}`).then(() => {
      toast.info('Booking cancelled');
      refreshSlots();
      fetchMyBookings();
    }).catch(err => toast.error('Cancel failed'));
  };

  const handleAddSlot = () => {
    const query = new URLSearchParams(newSlot).toString();
    slotMgmtRequest.post(`/admin/slots/bulk?${query}`)
      .then(() => {
        toast.success('Slots added for the full day');
        setShowAddSlotModal(false);
        setNewSlot({ sportid: '', facility: '', date: '' });
        refreshSlots();
      })
      .catch(err => {
        toast.error('Failed to add slots');
        console.error(err);
      });
  };
  

  const handleAddSport = () => {
    slotMgmtRequest.post('/admin/sports', newSport)
      .then(() => {
        toast.success('Sport added successfully');
        setShowAddSportModal(false);
        setNewSport({ sportid: '', sport: '', facility: '', capacity: '', sfid: '' });
  
        // refresh sports list
        return slotMgmtRequest.get('/admin/sports');
      })
      .then(res => setSports(res.data))
      .catch(err => {
        toast.error('Failed to add sport');
        console.error(err);
      });
  };
  

  const adminTabs = [
    { key: 'book', label: 'Manage Slots' },
    { key: 'mybookings', label: 'My Bookings' },
    { key: 'booked', label: 'Booked Slots' },
    { key: 'sports', label: 'Manage Sports' },
  ];

  const userTabs = [
    { key: 'book', label: 'Book a New Slot' },
    { key: 'mybookings', label: 'My Bookings' }
  ];

  const tabs = userRole === 'ADMIN' ? adminTabs : userTabs;

  if (!isLoggedIn) {
    return <div style={{ backgroundImage: `url(${sportsImg})`, height: '100vh', backgroundSize: 'cover', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Please log in</div>;
  }

  return (
    <Grid style={{ flexGrow: 1, margin: 0 }}>
      <Grid.Column width={3} style={{ height: '100%', backgroundColor: '#1b1c1d', padding: '24px', color: 'white' }}>
        {tabs.map(tab => (
          <Button fluid key={tab.key} onClick={() => setView(tab.key)} style={{ marginBottom: '12px' }}>{tab.label}</Button>
        ))}
      </Grid.Column>
      <Grid.Column width={13} style={{ height: '100%', padding: '24px' }}>
        {view === 'book' && (
          <>
            <Header as='h2'>{userRole === 'ADMIN' ? 'Manage Slots' : 'Book a Slot'}</Header>
            <Segment inverted style={{ display: 'flex', gap: '16px' }}>
              <Dropdown
                placeholder='Select Sport'
                fluid
                selection
                options={sports.map(s => ({ key: s.sportid, value: s.sportid, text: s.sport }))}
                value={selectedSport}
                onChange={(e, { value }) => setSelectedSport(value)}
                style={{ marginBottom: '16px', flex: 1 }}
              />
              <input
                type='date'
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flex: 1 }}
              />
              {userRole === 'ADMIN' && (
                <Button color='blue' onClick={() => setShowAddSlotModal(true)}>Add Slots</Button>
              )}
            </Segment>
            <Segment style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {loadingSlots ? <Loader active inline='centered' /> : (
                slots.map((slot, index) => (
                  <Segment key={index} raised color='green' onClick={() => handleBookSlot(slot)} style={{ cursor: 'pointer' }}>
                    <Icon name='clock' /> {slot.start} – {slot.end}
                  </Segment>
                ))
              )}
            </Segment>
          </>
        )}
        {view === 'mybookings' && (
          <>
            <Header as='h3'>My Bookings</Header>
            {loadingBookings ? <Loader active inline='centered' /> : <BookingComponent bookings={myBookings} onCancel={cancelBooking} />}
          </>
        )}
        {view === 'booked' && userRole === 'ADMIN' && (
          <>
            <Header as='h3'>All Booked Slots</Header>
            <BookingComponent bookings={allBookings} isAdmin={true} />
          </>
        )}
        {view === 'sports' && userRole === 'ADMIN' && (
          <>
            <Header as='h3'>Manage Sports</Header>
            <Button
  primary
  icon='plus'
  content='Add New Sport'
  onClick={() => setShowAddSportModal(true)}
  style={{ marginBottom: '16px' }}
/>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sport</Table.HeaderCell>
                  <Table.HeaderCell>Facility</Table.HeaderCell>
                  <Table.HeaderCell>Capacity</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sports.map(s => (
                  <Table.Row key={s.sportid}>
                    <Table.Cell>{s.sport}</Table.Cell>
                    <Table.Cell>{s.facility}</Table.Cell>
                    <Table.Cell>{s.capacity}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )}
      </Grid.Column>

      {showModal && selectedSlot && (
        <SlotBookingModal slot={selectedSlot} onConfirm={confirmBooking} onClose={() => setShowModal(false)} />
      )}

<Modal open={showAddSlotModal} onClose={() => setShowAddSlotModal(false)} size='small'>
  <Modal.Header>Bulk Add Slots</Modal.Header>
  <Modal.Content>
    <Form>
      <Form.Input
        label='Sport ID'
        value={newSlot.sportid}
        onChange={e => setNewSlot({ ...newSlot, sportid: e.target.value })}
      />
      <Form.Input
        label='Facility ID (SFID)'
        value={newSlot.facility}
        onChange={e => setNewSlot({ ...newSlot, facility: e.target.value })}
      />
      <Form.Input
        label='Date'
        type='date'
        value={newSlot.date}
        onChange={e => setNewSlot({ ...newSlot, date: e.target.value })}
      />
    </Form>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={handleAddSlot} positive>Submit</Button>
    <Button onClick={() => setShowAddSlotModal(false)} negative>Cancel</Button>
  </Modal.Actions>
</Modal>


      <Modal open={showAddSportModal} onClose={() => setShowAddSportModal(false)} size='small'>
  <Modal.Header>Add New Sport</Modal.Header>
  <Modal.Content>
    <Form>
      <Form.Input
        label='Sport ID'
        value={newSport.sportid}
        onChange={e => setNewSport({ ...newSport, sportid: e.target.value })}
      />
      <Form.Input
        label='Sport Name'
        value={newSport.sport}
        onChange={e => setNewSport({ ...newSport, sport: e.target.value })}
      />
      <Form.Input
        label='Facility'
        value={newSport.facility}
        onChange={e => setNewSport({ ...newSport, facility: e.target.value })}
      />
      <Form.Input
        label='Capacity'
        type='number'
        value={newSport.capacity}
        onChange={e => setNewSport({ ...newSport, capacity: e.target.value })}
      />
      <Form.Input
        label='SFID'
        value={newSport.sfid}
        onChange={e => setNewSport({ ...newSport, sfid: e.target.value })}
      />
    </Form>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={handleAddSport} positive>Submit</Button>
    <Button onClick={() => setShowAddSportModal(false)} negative>Cancel</Button>
  </Modal.Actions>
</Modal>


      <ToastContainer position="bottom-right" autoClose={3000} />
    </Grid>
  );
};

export default Body; 