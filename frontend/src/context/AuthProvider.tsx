import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: localStorage.getItem('connectedUser') || '',
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(localStorage.getItem('connectedUser') || '');

  useEffect(() => {
    const user = localStorage.getItem('connectedUser');
    if (user) {
      setUser(user);
    }else{
      setUser('');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('token');
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
