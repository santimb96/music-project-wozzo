import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
};

export default AppRoutes;