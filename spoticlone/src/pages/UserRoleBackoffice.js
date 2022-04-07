import React, { useContext, useEffect } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import AuthContext from "../contexts/AuthContext";
import { getRoles } from "../services/roles";

const UserRoleBackoffice = () => {

  const token = localStorage.getItem('token');
  //const auth = useContext(AuthContext);
  
  useEffect(()=> {
    getRoles(token)
    .then(rol => {
      console.log(rol)
    })
    .catch((err)=> {console.warn(err);})
  },[]);

  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-8">
        <h1>UserRole!</h1>
        <table className="table bg-dark text-light text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              {/* <th scope="col">Opciones</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
      {/* <td><button className="btn btn-danger me-3"><i className="fa fa-trash" aria-hidden="true"></i></button>
      <button className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRoleBackoffice;
