import React, { createContext, useContext, useState } from 'react';

// LoginContext
const LoginContext = createContext();

//hook to consume the LoginContext
const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};

// LoginProvider component
const LoginProvider = ({ children }) => {

  const isLogin =   localStorage.getItem('isLogin');
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin === 'true');

  const handleLogin = () => {
    
    setIsLoggedIn(true);
    localStorage.setItem('isLogin', true)
    
  };

  const handleLogout = () => {
   
    setIsLoggedIn(false);
    localStorage.removeItem('isLogin')
  };

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export { LoginProvider, useLoginContext };
