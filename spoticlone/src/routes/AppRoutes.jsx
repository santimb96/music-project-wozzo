import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { format } from "date-fns";
import { autoLogin } from "../services/user.js";
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
            userLog?.user.userRoleId.name !== "admin" && navigateWithParams();
          })
          // si no están alguno de los 3 o si ha expirado el token, borramos localstorage y redirigimos a la página principal
          .catch(() => {
            removeUserStorage();
            navigateWithParams();
          })
          .finally(() => setLoading(false));
      } else {
        removeUserStorage();
        setLoading(false);
        navigateWithParams();
      }
    } else {
      removeUserStorage();
      navigateWithParams();
    }
  }, [window.location.pathname]);

  const navigateWithParams = () => {
    const uri = new URLSearchParams(window.location.search);
    const param = uri.get('type') || uri.get('genre');
    setLoading(false);
    if(param === "medialist" || param === "favourites"){
      navigate({ pathname: "/list", search: `?type=${param}` });
    } else if (param === null){
      if(window.location.pathname === "/list" || window.location.pathname.includes('/backoffice')){
        navigate("/list");
      } else {
        navigate('/page-not-found') ;
      }
    } else {
      navigate({ pathname: "/list", search: `?genre=${param}` });
    }
  }

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
        <Route path="/page-not-found" element={<NotFound />} />
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
