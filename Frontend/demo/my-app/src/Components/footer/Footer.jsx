import React from 'react';

const styles = {
  footer: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f1f1f1',
    fontSize: '14px',
    color: '#666',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} Athledger. All rights reserved.
    </footer>
  );
};

export default Footer;
