import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
import Home from "../pages/Home/Home";
import routes from "../utils/routes.js";
import { removeUserStorage } from "../utils/localStorage.js";

import UserBackoffice from "../pages/UserBackoffice/UserBackoffice";
import UserRoleBackoffice from "../pages/UserRoleBackoffice/UserRoleBackoffice";
import ArtistBackoffice from "../pages/ArtistBackoffice/ArtistBackoffice";
import SongBackoffice from "../pages/SongBackoffice/SongBackoffice";
import FavouriteSongBackoffice from "../pages/FavouriteSongBackoffice/FavouriteSongBackoffice";
import Favourites from "../pages/Favourites/Favourites";

import GlobalLoading from "../components/GlobalLoading/GlobalLoading";
import NotFound from "../components/NotFound/NotFound";
import SidebarHome from "../components/SidebarHome/SidebarHome";
import AuthModal from "../components/AuthModal/AuthModal";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";
import MediaContext from "../contexts/MediaContext";

const AppRoutes = () => {
  const { setLoading, loading, setUser, setUserRole, user, userRole } =
    useContext(AuthContext);
  const { selectedSong } = useContext(MediaContext);
  const isUser = user?._id && userRole === "user";
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
            setUserRole(userLog.user.userRoleId.name);
          })
          // si no están alguno de los 3 o si ha expirado el token, borramos localstorage y redirigimos a login
          .catch(() => {
            removeUserStorage();
            navigate("/");
          })
          .finally(() => setLoading(false));
      } else {
        removeUserStorage();
        setLoading(false);
        navigate("/");
      }
    } else {
      removeUserStorage();
      const found = routes.find((r) => r.route === window.location.pathname);
      setLoading(false);
      if (found) {
        navigate("/");
      }
    }
  }, [window.location.pathname]);

  const RequireUser = ({ children }) => {
    if (isUser) {
      return children;
    } else {
      return <Navigate to="/" replace></Navigate>;
    }
  };

  const RequireAdmin = ({ children }) => {
    if (isAdmin) {
      return children;
    } else {
      return <Navigate to="/" replace></Navigate>;
    }
  };

  if (loading) return <GlobalLoading />;
  
  return (
    <>
      <SidebarHome />
      <HomeHeader />
      <AuthModal />
      {selectedSong?._id && <MediaPlayer />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route
          path="/favourites"
          element={
            <RequireUser>
              <Favourites />
            </RequireUser>
          }
        />
        {/* PRIVATE ROUTES */}
        <Route
          path="/backoffice/roles"
          element={
            <RequireAdmin>
              <UserRoleBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/users"
          element={
            <RequireAdmin>
              <UserBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/artists"
          element={
            <RequireAdmin>
              <ArtistBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/songs"
          element={
            <RequireAdmin>
              <SongBackoffice />
            </RequireAdmin>
          }
        />
        <Route
          path="/backoffice/favouriteSongs"
          element={
            <RequireAdmin>
              <FavouriteSongBackoffice />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
