import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { createUser, getUsers, removeUser } from "../services/user.js";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
import { InputBase } from '@mui/material';

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [role, setRole] = useState(null);
  const [id, setId] = useState("");

  const getData = () => {
    getUsers(token)
      .then((user) => {
        console.log(user);
        setUsers(user?.users);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = users?.filter((user) => {
      if (user.name.includes(text) || user.email.includes(text)) {
        return true;
      }
      return false;
    });
    setFilteredUsers(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredUsers;
    }
    return users;
  };

  const setData = (user) => {
    //const {name, email, password, userRoleId } = user;
    setId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.userRoleId);
  };

  const postUser = () => {
    if (password === passRepeat) {
      createUser(name, email, password, role, token)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => console.error(err));
    }
  };

  const deleteUser = (id) => {
    removeUser(id, token)
      .then((user) => {
        console.log(user);
        getData();
      })
      .catch((err) => console.error(err));
  };

  console.log(role);
  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <Grid container xs={8}>
        <Box
          component="form"
          
          xs={8}
          noValidate
          autoComplete="off"
        >
          <InputBase className="input" id="outlined-basic" label="Outlined" variant="outlined"/>
        </Box>{" "}
        <TableContainer component={Paper} className="table-container">
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
            className = "table-content"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsToShow()?.map((user) => (
                <TableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.userRoleId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* <div className="col-4 grid-margin stretch-card mt-5">
        <div className="card bg-dark text-light">
          <div className="card-body mt-4">
            <h4 className="card-title text-center">Usuarios</h4>
            <p className="card-description text-center">Lista de usuarios</p>
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="busca..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table className="table text-light">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToShow()?.map((user) => (
                    <tr key={user._id} onClick={() => setData(user)} >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.userRoleId}</td>
                      <td><button onClick={() => deleteUser(user._id)} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-4 grid-margin stretch-card mt-5">
        <div className="card bg-dark text-light">
          <div className="card-body mt-4">
            
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="nombre"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="email"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="correo"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="contraseña"
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <input
                type="password"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="repite contraseña"
                onChange={(e) => setPassRepeat(e.target.value)}
                
              />
              <div class="form-check">
                <input
                  class="form-check-input mb-2"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onChange={(e) => setRole(e.target.value)}
                  value="user"
                  
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Usuario
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input mb-2"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="admin"
                  onChange={(e) => setRole(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Administrador
                </label>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={postUser} style={{ minWidth: '4rem', width: '7rem'}}>Crear</button>
                <button className="btn btn-success" style={{ minWidth: '4rem', width: '7rem'}}>Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default UserBackoffice;
