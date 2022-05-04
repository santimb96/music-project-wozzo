import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Login from "../pages/Login/Login";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
import Home from "../pages/Home/Home";
import routes from "../utils/routes.js";
import { removeUserStorage } from "../utils/localStorage.js";
import UserBackoffice from "../pages/UserBackoffice/UserBackoffice";
import UserRoleBackoffice from "../pages/UserRoleBackoffice/UserRoleBackoffice";
import ArtistBackoffice from "../pages/ArtistBackoffice/ArtistBackoffice";
import SongBackoffice from "../pages/SongBackoffice/SongBackoffice";

const AppRoutes = () => {
  const authSet = useContext(AuthContext);

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
            authSet.setUser(userLog);
            authSet.setUserRole(userLog.user.userRoleId.name);
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
  }, [window.location.pathname]);

  const checkLogin = () => {
    if (
      authSet.user.user &&
      authSet.userRole === "admin" &&
      authSet.user.user._id === localStorage.getItem("userId")
    ) {
      return true;
    } else {
      window.history.pushState({}, null, "/");
      return false;
    }
  };

  return (
    //
    //   <Route element={<Login/>} path="/login"  render={() => checkLogin(Login)}/>
    //   <Route path="/register"render={() => checkLogin(Register)} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/backoffice/roles"
        element={checkLogin() ? <UserRoleBackoffice /> : <Home />}
      />
      <Route
        path="/backoffice/users"
        element={checkLogin() ? <UserBackoffice /> : <Home />}
      />
      <Route
        path="/backoffice/artists"
        element={checkLogin() ? <ArtistBackoffice /> : <Home />}
      />
      <Route
        path="/backoffice/songs"
        element={checkLogin() ? <SongBackoffice /> : <Home />}
      />
    </Routes>
  );
};

export default AppRoutes;
