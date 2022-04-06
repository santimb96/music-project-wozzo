import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [ userRole, setUserRole ] = useState('');

  return (
    <AuthContext.Provider value={{ user, userRole, setUser, setUserRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
