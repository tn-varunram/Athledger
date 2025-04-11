// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  // user object might look like: { token: '...', role: 'admin' or 'student', ... }

  useEffect(() => {
    // Optionally load user data from localStorage if you want to persist after refresh
    const storedUser = localStorage.getItem('athledgerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // Save to state and localStorage
    setUser(userData);
    localStorage.setItem('athledgerUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('athledgerUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
