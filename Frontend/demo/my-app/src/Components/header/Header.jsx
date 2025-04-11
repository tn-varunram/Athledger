import React, { useState } from 'react';
import  LoginModal from './LoginModal'
import  RegisterModal from './RegisterModal'

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease-in-out',
  },
  buttonSecondary: {
    backgroundColor: '#2196F3',
  }
};

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#1a1a1a',
        color: 'white',
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Athledger</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowLogin(true)} style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
            Login
          </button>
          <button onClick={() => setShowRegister(true)} style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}>
            Register
          </button>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};


export default Header;
