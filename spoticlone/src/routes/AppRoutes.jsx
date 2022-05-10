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

  const isAdmin = () => {
    if (user && userRole === "admin") {
      return true;
    } else {
      window.history.pushState({}, null, "/");
      return false;
    }
  };

  if (loading) return <GlobalLoading />;

  if (
    !routes.find((r) => r.route === window.location.pathname) &&
    !["/login", "/register", "/", "/favourites"].includes(
      window.location.pathname
    )
  )
    return <NotFound />;

  return (
    <>
      <SidebarHome />
      <HomeHeader />
      <AuthModal />
      {selectedSong?._id && (
        <MediaPlayer />
      )}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        {/* PRIVATE ROUTES */}
        <Route
          path="/backoffice/roles"
          element={isAdmin() ? <UserRoleBackoffice /> : <Home />}
        />
        <Route
          path="/backoffice/users"
          element={isAdmin() ? <UserBackoffice /> : <Home />}
        />
        <Route
          path="/backoffice/artists"
          element={isAdmin() ? <ArtistBackoffice /> : <Home />}
        />
        <Route
          path="/backoffice/songs"
          element={isAdmin() ? <SongBackoffice /> : <Home />}
        />
        <Route
          path="/backoffice/favouriteSongs"
          element={isAdmin() ? <FavouriteSongBackoffice /> : <Home />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
