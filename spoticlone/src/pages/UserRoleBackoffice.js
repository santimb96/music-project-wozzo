import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import AuthContext from "../contexts/AuthContext";
import { getRoles } from "../services/roles";

const UserRoleBackoffice = () => {
  /* <td><button className="btn btn-danger me-3"><i className="fa fa-trash" aria-hidden="true"></i></button>
      <button className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td> */

  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getRoles(token)
      .then((rol) => {
        console.log(rol);
        setRoles(rol?.userRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    const filtered = roles?.userRoles?.filter((role) => {
      if(role.name.includes(text) || role._id.includes(text)) {
        return true;
      }
      return false;
    });
    console.warn(filtered);
    setFilteredRoles(filtered)
  }, [ text ])

  const itemsToShow = () => {
    if(text?.length) {
      return filteredRoles;
    }
    return roles;
  }
  

  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-8 mt-5">
        <div>
          <input
            type="email"
            className="form-control mb-4"
            id="exampleFormControlInput1"
            placeholder="busca..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <table className="table bg-dark text-light text-center container-fluid">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                {/* <th scope="col">Opciones</th> */}
              </tr>
            </thead>
            <tbody>
              {/* todo roles or filtered roles */}
              {itemsToShow()?.map((rol) => (
                <tr key={rol._id}>
                  <th scope="row">{rol._id}</th>
                  <td>{rol.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRoleBackoffice;
