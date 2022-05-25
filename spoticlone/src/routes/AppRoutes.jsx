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
    // we check if we have token, expiry date and user id. If we have all of them , we check if the token is expired. If not, we auto login
    if (expiryDate && token && userId) {
      if (expiryDate >= dateNow) {
        setLoading(true);
        autoLogin(userId, token)
          .then((userLog) => {
            //we add user and userRole in context and check his role
            setUser(userLog?.user);
            setUserRole(userLog?.user.userRoleId.name);
            userLog?.user.userRoleId.name !== "admin" && navigateWithParams();
          })
          // if the promises return an error, we navigate to home page and remove user and userRole from localStorage
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
    const param = uri.get("type") || uri.get("genre");
    setLoading(false);
    // if param is not null, navigate to the page with the param (type or genre)
    if (param === "medialist" || param === "favourites") {
      navigate({ pathname: "/list", search: `?type=${param}` });
    } else if (param === null) {
      // if pathname is list or backoffice, navigate to home page (/list), else navigate to not found page
      if (
        window.location.pathname === "/list" ||
        window.location.pathname.includes("/backoffice")
      ) {
        navigate("/list");
      } else {
        navigate("/page-not-found");
      }
    } else {
      navigate({ pathname: "/list", search: `?genre=${param}` });
    }
  };

  // this function controls if user is admin or not; if his role is admin, only can navigate to backoffice pages
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
        {/* PUBLIC ROUTES */}
        {/* 404 NOT FOUND - not found page added to route */}
        <Route path="/page-not-found" element={<NotFound />} />
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
