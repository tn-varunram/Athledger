const modalStyles = {
    backdrop: {
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    modal: {
      backgroundColor: '#fff',
      color: '#000',
      padding: '24px',
      borderRadius: '12px',
      minWidth: '300px',
      maxWidth: '400px',
    },
    input: {
      display: 'block',
      width: '100%',
      marginBottom: '12px',
      padding: '8px',
      fontSize: '14px',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginBottom: '8px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '6px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };
export default modalStyles;