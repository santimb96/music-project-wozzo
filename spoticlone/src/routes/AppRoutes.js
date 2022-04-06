import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AdminBackoffice from "../pages/AdminBackoffice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
import Home from "../pages/Home";

const AppRoutes = () => {
  const authSet = useContext(AuthContext);
  const { user, userRole } = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dateNow = format(new Date(), 'dd/MM/yyyy HH:mm' );
    // mirar si hay token, userId y expiryDate en localstorage
    //si están los tres, seguimos
    if(expiryDate && token && userId){
      if(expiryDate >= dateNow){
        autoLogin(userId, token)
          .then(user => {
            //metemos user y userRole en authContext
            authSet.setUser(user);
            authSet.setUserRole(user.user.userRoleId.name);
            //¿? redirigimos a back desde navigate ¿?
            navigate('/backoffice/admin');
          })
          // si no están alguno de los 3 o si ha expirado el token, borramos localstorage y redirigimos a login
          .catch(err => console.warn(err));
      } else {
        localStorage.clear();
        navigate('/login');
      }
    } else {
      localStorage.clear();
    }
  }, []);

  // const checkLogin = (element) => {
  //   // si hay user y userRole redirigir a backoffice
  //   if(user && userRole) {
  //     return AdminBackoffice;
  //   }
  //   // si no hay devolver el element
  //   return element;
  // }

  return (
    //
    //   <Route element={<Login/>} path="/login"  render={() => checkLogin(Login)}/>
    //   <Route path="/register"render={() => checkLogin(Register)} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/backoffice/admin" element={<AdminBackoffice />} />
    </Routes>
  );
};

export default AppRoutes;
