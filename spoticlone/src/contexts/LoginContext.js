import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({children}) => {
  const [login, setLogin] = useState({email: null, password: null });

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
