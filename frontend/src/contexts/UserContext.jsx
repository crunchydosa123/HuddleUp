import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // optional persistence
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};
