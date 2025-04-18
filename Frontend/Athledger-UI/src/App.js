import React, { useState, useEffect } from 'react';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Body from './Components/body/Body';
import { Container } from 'semantic-ui-react';
import './App.css';


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setUserRole] = useState('USER');

  useEffect(() => {
    const token = localStorage.getItem('athledgerToken');
    const roleUser = localStorage.getItem('role');
    if (token) {
      try {
        setLoggedIn(true);
        setUserRole(roleUser);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <Container fluid style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 0 }}>
      <Header setIsLoggedIn={(loggedIn) => setLoggedIn(loggedIn)} setRole={(role) => setUserRole(role)} />
      <div style={{ flex: 1, display: 'flex' }}>
      <Body loggedIn={isLoggedIn} role={role} />
      </div>
      <Footer />
    </Container>
  );
};

export default App;