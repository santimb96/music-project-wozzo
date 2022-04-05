import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({children}) => {
  const [login, setLogin] = useState({email: '', password: ''});

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
