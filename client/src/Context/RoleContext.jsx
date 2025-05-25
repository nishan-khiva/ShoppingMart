import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const setUserRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};
