import React from "react";
import { Link } from "react-router-dom";

const AdminBackoffice = () => {
  return (
    <div>
      Hola, admin!
      <button>
        <Link to="/" >Home</Link>
      </button>
    </div>
  )
}

export default AdminBackoffice;