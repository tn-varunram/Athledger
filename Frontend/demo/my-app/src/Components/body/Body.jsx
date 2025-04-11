import React, { useState } from 'react';
import sportsImg from './../../assets/sports.jpg'
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
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent overlay
      zIndex: 1,
    },
    content: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      zIndex: 2,
    },
    left: {
      flex: 1,
      paddingRight: '32px',
    },
    right: {
      flex: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '24px',
      borderRadius: '10px',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '16px',
    },
    timeslot: {
      backgroundColor: '#4CAF50',
      padding: '12px',
      margin: '8px 0',
      borderRadius: '6px',
      color: 'white',
      fontWeight: 'bold',
    },
  };  

const sportsData = {
  Football: ['9:00 AM', '11:00 AM', '3:00 PM'],
  Tennis: ['10:00 AM', '1:00 PM', '6:00 PM'],
  Basketball: ['8:00 AM', '12:00 PM', '4:00 PM'],
};

const Body = () => {
  const [selectedSport, setSelectedSport] = useState('');
  
  return (
    <div style={styles.container}>
  <div style={styles.overlay}></div>
  <div style={styles.content}>
    <div style={styles.left}>
      <label htmlFor="sport-select">Select Sport:</label>
      <select
        id="sport-select"
        style={styles.select}
        onChange={(e) => setSelectedSport(e.target.value)}
        value={selectedSport}
      >
        <option value="">-- Choose a sport --</option>
        {Object.keys(sportsData).map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
    <div style={styles.right}>
      {selectedSport ? (
        <>
          <h2>{selectedSport} - Available Time Slots</h2>
          {sportsData[selectedSport].map((time, index) => (
            <div key={index} style={styles.timeslot}>
              {time}
            </div>
          ))}
        </>
      ) : (
        <p>Please select a sport to see available time slotDetails.</p>
      )}
    </div>
  </div>
</div>
  );
};

export default Body;
