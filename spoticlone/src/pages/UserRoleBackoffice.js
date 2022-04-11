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
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { grey, green } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { InputBase } from "@mui/material";

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
    <div>
      <Grid container spacing={{ xs: 3 }}>
        <SidebarBackoffice />
        <Grid item xs={10} className="bg-success">
          <Container maxWidth="sm">
            <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
              <Table
                size="small"
                aria-label="a dense table"
                className="table-content"
                
              >
                <TableHead >
                  <div className="table-head-item">
                    <InputBase
                      className="input"
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      placeholder="busca..."
                     onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <TableRow >
                    <TableCell style={{color: theme.palette.secondary.light}} align="left">Id</TableCell>
                    <TableCell style={{color: theme.palette.secondary.light}} align="left">Rol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {itemsToShow()?.map((user) => (
                    <TableRow
                      key={user.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      
                    >
                      <TableCell style={{color: theme.palette.secondary.light}} align="left">{user._id}</TableCell>
                      <TableCell style={{color: theme.palette.secondary.light}} align="left">{user.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>

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
