import React from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";

const UserBackoffice = () => {
  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-8">
        <h1>User!</h1>
      </div>
    </div>
  )
}

export default UserBackoffice;