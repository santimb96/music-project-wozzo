import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [ userRole, setUserRole ] = useState('');
  const [ loading, setLoading ] = useState(true);

  return (
    <AuthContext.Provider value={{ user, userRole, setUser, setUserRole, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
