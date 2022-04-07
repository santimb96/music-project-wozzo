import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AdminBackoffice from "../pages/AdminBackoffice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
import Home from "../pages/Home";
import routes from "../utils/routes.js";
import { removeUserStorage } from "../utils/localStorage.js";
import UserBackoffice from "../pages/UserBackoffice";
import UserRoleBackoffice from "../pages/UserRoleBackoffice";

const AppRoutes = () => {
  const authSet = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const dateNow = format(new Date(), "dd/MM/yyyy HH:mm");
    // mirar si hay token, userId y expiryDate en localstorage
    //si están los tres, seguimos
    if (expiryDate && token && userId) {
      if (expiryDate >= dateNow) {
        autoLogin(userId, token)
          .then((userLog) => {
            //metemos user y userRole en authContext
            if (user._id === userLog._id && userId !== null) {
              return;
            } else {
              authSet.setUser(userLog);
              authSet.setUserRole(userLog.user.userRoleId.name);
            }
          })
          // si no están alguno de los 3 o si ha expirado el token, borramos localstorage y redirigimos a login
          .catch(() => {
            removeUserStorage();
            navigate("/login");
          });
      } else {
        removeUserStorage();
        navigate("/login");
      }
    } else {
      removeUserStorage();
      const found = routes.find((r) => r.route === window.location.pathname);
      if (found) {
        navigate("/login");
      }
    }
  }, [user, window.location.pathname]);

  // const checkLogin = (element) => {
  //   // si hay user y userRole redirigir a backoffice
  //   if(user && userRole) {
  //     return AdminBackoffice;
  //   }
  //   // si no hay devolver el element
  //   return element;
  // }

  //si es admin, poner sidebar, si no, nada

  return (
    //
    //   <Route element={<Login/>} path="/login"  render={() => checkLogin(Login)}/>
    //   <Route path="/register"render={() => checkLogin(Register)} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/backoffice/admin" element={<AdminBackoffice />} />
      <Route path="/backoffice/roles" element={<UserRoleBackoffice />} />
      <Route path="/backoffice/users" element={<UserBackoffice />} />
      {/* <Route path="/backoffice/artists" element={<AdminBackoffice />} />
      <Route path="/backoffice/songs" element={<AdminBackoffice />} /> */}
    </Routes>
  );
};

export default AppRoutes;
