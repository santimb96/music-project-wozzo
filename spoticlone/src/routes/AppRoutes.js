import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminBackoffice from "../pages/AdminBackoffice";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/backoffice/admin" element={<AdminBackoffice />} />
    </Routes>
  )
};

export default AppRoutes;