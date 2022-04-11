import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { createUser, getUsers, removeUser } from "../services/user.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { InputBase } from "@mui/material";
import Container from "@mui/material/Container";
import theme from "../palette/palette";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SpinnerLoading from "../components/common/SpinnerLoading";

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [role, setRole] = useState(null);
  const [id, setId] = useState("");

  /**
   * DELETE MODAL
   */
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (userId) => {
    setOpenDelete(true);
    setId(userId);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  /**
   * FORM MODAL TODO
   */
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

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
        getData();
        setOpenDelete(false);
      })
      .catch((err) => console.error(err));
  };

  console.log(role);
  return (
    <Grid container spacing={{ xs: 3 }}>
      <SidebarBackoffice />
      <Grid container xs={10} className="bg-success">
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: theme.palette.primary.main, height: "100%" }}>
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
            <TableContainer component={Paper} className="table-content">
            {!itemsToShow() ? <div className="d-flex justify-content-center"><SpinnerLoading /></div>
                : <Table
                size="medium"
                aria-label="a dense table"
                className="table-content"
              >
                <TableHead>
                  <Button onClick={handleOpenForm}>Form modal</Button>
                  <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        ¿Estás seguro de que quieres borrarlo?
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="typo-flex">
                          <Button
                            onClick={() => deleteUser(id)}
                            className="btn-modal btn-delete"
                          >
                            Sí
                          </Button>{" "}
                          <Button
                            className="btn-modal "
                            onClick={handleCloseDelete}
                          >
                            No
                          </Button>
                        </div>
                      </Typography>
                    </Box>
                  </Modal>

                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <div>
                        <InputBase
                          value={name}
                          type="text"
                          className="input"
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          placeholder="nombre"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <InputBase
                          className="input"
                          type="email"
                          value={email}
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputBase
                          className="input"
                          type="password"
                          value={password}
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          placeholder="contraseña"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputBase
                          className="input"
                          type="password"
                          value={passRepeat}
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          placeholder="repite contraseña"
                          onChange={(e) => setPassRepeat(e.target.value)}
                        />
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="user"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="user"
                            control={<Radio />}
                            label="Usuario"
                          />
                          <FormControlLabel
                            value="admin"
                            control={<Radio />}
                            label="Administrador"
                          />
                        </RadioGroup>
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="typo-flex">
                          <Button
                            onClick={() => postUser()}
                            className="btn-modal-form"
                          >
                            Crear
                          </Button>{" "}
                          <Button className="btn-modal-form">Actualizar</Button>
                        </div>
                      </Typography>
                    </Box>
                  </Modal>

                  <TableRow>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      Rol
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      Borrar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {itemsToShow()?.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      {user.name}
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                    >
                      {user.userRoleId}
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.light }}
                      align="left"
                      onClick={() => handleOpenDelete(user._id)}
                    >
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
                }
                
            </TableContainer>
          </Box>
        </Container>
      </Grid>
    </Grid>
    // <Grid container xs={8}>
    //   <Box
    //     component="form"

    //     xs={8}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <InputBase className="input" id="outlined-basic" label="Outlined" variant="outlined"/>
    //   </Box>{" "}
    //   <TableContainer component={Paper} className="table-container">
    //     <Table
    //       sx={{ minWidth: 650 }}
    //       size="small"
    //       aria-label="a dense table"
    //       className = "table-content"
    //     >
    //       <TableHead>
    //         <TableRow>
    //           <TableCell align="left">Nombre</TableCell>
    //           <TableCell align="left">Email</TableCell>
    //           <TableCell align="left">Rol</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {itemsToShow()?.map((user) => (
    //           <TableRow
    //             key={user.name}
    //             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           >
    //             <TableCell align="left">{user.name}</TableCell>
    //             <TableCell align="left">{user.email}</TableCell>
    //             <TableCell align="left">{user.userRoleId}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Grid>
    /* <div className="col-4 grid-margin stretch-card mt-5">
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
    </div> */
  );
};

export default UserBackoffice;
