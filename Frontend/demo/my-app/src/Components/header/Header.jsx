import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
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

  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('athledgerToken');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded.sub || decoded.username); // adjust based on your JWT
    } catch {
      setUser(null);
    }
  }
}, []);
   
const logout = () => {
  localStorage.removeItem('athledgerToken');
  setUser(null);
};


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
        {user ? (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <span style={{ fontWeight: 'bold' }}>Welcome, {user}</span>
    <button onClick={logout} style={{
      padding: '8px 16px', borderRadius: '6px', backgroundColor: '#e53935', color: 'white', border: 'none'
    }}>
      Logout
    </button>
  </div>
) : (
  <div style={{ display: 'flex', gap: '12px' }}>
    <button onClick={() => setShowLogin(true)} style={{
      padding: '8px 16px', borderRadius: '6px', backgroundColor: '#4CAF50', color: 'white', border: 'none'
    }}>
      Login
    </button>
    <button onClick={() => setShowRegister(true)} style={{
      padding: '8px 16px', borderRadius: '6px', backgroundColor: '#2196F3', color: 'white', border: 'none'
    }}>
      Register
    </button>
  </div>
)}

        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={(uname) => setUser(uname)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};


export default Header;
