import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
import routes from "../utils/routes.js";
import { removeUserStorage } from "../utils/localStorage.js";

import UsersBackoffice from "../pages/UsersBackoffice/UsersBackoffice";
import UserRolesBackoffice from "../pages/UserRolesBackoffice/UserRolesBackoffice";
import ArtistsBackoffice from "../pages/ArtistsBackoffice/ArtistsBackoffice";
import SongsBackoffice from "../pages/SongsBackoffice/SongsBackoffice";
import FavouritesSongBackoffice from "../pages/FavouriteSongsBackoffice/FavouriteSongsBackoffice";

import GlobalLoading from "../components/GlobalLoading/GlobalLoading";
import NotFound from "../components/NotFound/NotFound";
import SidebarHome from "../components/Sidebar/Sidebar";
import AuthModal from "../components/AuthModal/AuthModal";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import PublicWrapper from "../pages/PublicWrapper/PublicWrapper";
import GenresBackoffice from "../pages/GenresBackoffice/GenresBackoffice";

const AppRoutes = () => {
  const { setLoading, loading, setUser, setUserRole, user, userRole } =
    useContext(AuthContext);
  const isUser = user?._id && (userRole === "user" || userRole === "admin");
  const isAdmin = user?._id && userRole === "admin";

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
        setLoading(true);
        autoLogin(userId, token)
          .then((userLog) => {
            //metemos user y userRole en authContext
            setUser(userLog?.user);
            setUserRole(userLog?.user.userRoleId.name);
          })
          // si no están alguno de los 3 o si ha expirado el token, borramos localstorage y redirigimos a la página principal
          .catch(() => {
            removeUserStorage();
            navigate("/list");
          })
          .finally(() => setLoading(false));
      } else {
        removeUserStorage();
        setLoading(false);
        navigate("/list");
      }
    } else {
      removeUserStorage();
      //const found = routes.find((r) => r.route === window.location.pathname);
      setLoading(false);
      navigate("/list");
      // const uri = new URLSearchParams(window.location.search);
      // const param = uri.get('type') || uri.get('genre');
      // param === "medialist" ?  navigate("/list?type=" + param) : navigate("/list?genre=" + param);
    }
  }, [window.location.pathname]);

  // const RequireUser = ({ children }) => {
  //   if (isUser) {
  //     return children;
  //   } else {
  //     return <Navigate to="/" replace></Navigate>;
  //   }
  // };

  const RequireAdmin = ({ children }) => {
    if (isAdmin) {
      return children;
    } else {
      return <Navigate to="/list" replace></Navigate>;
    }
  };

  if (loading) return <GlobalLoading />;

  return (
    <>
      <SidebarHome />
      <HomeHeader />
      <AuthModal />
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* PUBLIC ROUTES */}
        <Route path="/list" element={<PublicWrapper />} />
        {/* PRIVATE ROUTES */}
        <Route
          path="/backoffice/roles"
          element={
            <RequireAdmin>
              <UserRolesBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/users"
          element={
            <RequireAdmin>
              <UsersBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/artists"
          element={
            <RequireAdmin>
              <ArtistsBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/songs"
          element={
            <RequireAdmin>
              <SongsBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/favouriteSongs"
          element={
            <RequireAdmin>
              <FavouritesSongBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/genres"
          element={
            <RequireAdmin>
              <GenresBackoffice />
            </RequireAdmin>
          }
        />
        <Route path="/" element={<Navigate to="/list" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
