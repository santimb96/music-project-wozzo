import React, { useState } from "react";

const AuthContext = React.createContext();

export const MODAL_STATES = {
  LOGIN: "login",
  REGISTER: "register",
}

export const AuthProvider = ({children}) => {
  const [ user, setUser] = useState(null);
  const [ userRole, setUserRole ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ authModalType, setAuthModalType ] = useState(MODAL_STATES.LOGIN);

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        setUser,
        setUserRole,
        loading,
        setLoading,
        showAuthModal,
        setShowAuthModal,
        authModalType,
        setAuthModalType
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
