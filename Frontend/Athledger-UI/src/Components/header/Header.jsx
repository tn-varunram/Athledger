import React, { useState, useEffect } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { jwtDecode } from 'jwt-decode';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Header = ({ setIsLoggedIn, setRole }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('athledgerToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.sub || decoded.username);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('athledgerToken');
    localStorage.removeItem('role');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <Menu inverted pointing secondary size='large' style={{ margin: 0, borderRadius: 0, backgroundColor: '#000' }}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Menu.Item header style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>
  Athledger
</Menu.Item>

          <Menu.Menu position='right'>
            {user ? (
              <Menu.Item>
                <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Welcome, {user}</span>
                <Button negative onClick={logout}>Logout</Button>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Button primary onClick={() => setShowLogin(true)} style={{ marginRight: '10px' }}>Login</Button>
                <Button secondary onClick={() => setShowRegister(true)}>Register</Button>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Container>
      </Menu>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(uname) => setUser(uname)}
          setIsLoggedIn={setIsLoggedIn}
          setRole={setRole}
        />
      )}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}
    </>
  );
};

export default Header;
