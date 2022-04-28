import React from "react";
import { Link } from "react-router-dom";
import SidebarBackoffice from "../components/SidebarBackoffice/SidebarBackoffice";

const AdminBackoffice = () => {
  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-8">
        <h1>Admin!</h1>
      </div>
    </div>
  )
}

export default AdminBackoffice;