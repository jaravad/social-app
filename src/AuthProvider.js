import React, { createContext, useState, useEffect } from 'react';
import { auth, checkUserAuth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({ isAuthenticated: null, user: null });

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isUserAuth = await checkUserAuth();
      setIsAuthenticated(isUserAuth);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsAuthenticated(user !== null);
      });

      return () => unsubscribe();
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
