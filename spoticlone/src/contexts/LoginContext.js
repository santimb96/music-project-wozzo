import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({children}) => {
  const [login, setLogin] = useState({email: null, password: null });
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem('userData')) || false);

  return (
    <LoginContext.Provider value={{login, setLogin, logged, setLogged}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
