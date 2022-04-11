import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { getRoles } from "../services/roles";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import theme from "../palette/palette.js";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

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
        setRoles(rol?.userRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    const filtered = roles?.filter((role) => {
      if (role.name.includes(text) || role._id.includes(text)) {
        return true;
      }
      return false;
    });
    setFilteredRoles(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredRoles;
    }
    return roles;
  };

  return (
      <SidebarBackoffice />

    // <div className="row bg-success">
    //   <SidebarBackoffice />
    //   <div className="col-8 mt-5">
    //     <div>
    //       <input
    //         type="email"
    //         className="form-control mb-4"
    //         id="exampleFormControlInput1"
    //         placeholder="busca..."
    //         onChange={(e) => setText(e.target.value)}
    //       />
    //     </div>
    //     <div className="d-flex justify-content-center">
    //       <table className="table bg-dark text-light text-center container-fluid">
    //         <thead>
    //           <tr>
    //             <th scope="col">Id</th>
    //             <th scope="col">Nombre</th>
    //             {/* <th scope="col">Opciones</th> */}
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {/* todo roles or filtered roles */}
    //           {itemsToShow()?.map((rol) => (
    //             <tr key={rol._id}>
    //               <th scope="row">{rol._id}</th>
    //               <td>{rol.name}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserRoleBackoffice;
