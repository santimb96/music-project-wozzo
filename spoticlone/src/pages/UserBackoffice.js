import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "../services/user.js";
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
import SpinnerLoading from "../components/common/SpinnerLoading";
import { pink } from "@mui/material/colors";
import ROLES from "../utils/roleId";
import TextField from "@mui/material/TextField";

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [role, setRole] = useState("user");
  const [id, setId] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  /**
   *
   * OPEN SIDEBAR
   */

  const handleOpenSidebar = () => {
    if (openSidebar) {
      document.getElementById("sidebar").style.display = "none";
      setOpenSidebar(false);
    } else {
      document.getElementById("sidebar").style.display = "grid";
      document.getElementById("sidebar").style.width = "100%";
      setOpenSidebar(true);
    }
  };
  /**
   * ERROR MODAL
   */
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setTimeout(() => setOpenError(false), 1500);
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

  const handleCloseForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassRepeat("");
    setRole("user");
    setId("");
    setRoleId(null);

    setOpenForm(false);
  };

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
      if (
        user.name
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim()) ||
        user.email.toLocaleLowerCase().includes(text.toLocaleLowerCase().trim())
      ) {
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

  const validateData = () => {
    if (
      name?.length &&
      email?.length &&
      password?.length &&
      passRepeat?.length
    ) {
      if (password === passRepeat && email.indexOf("@") !== -1) {
        return true;
      }
    }
    return false;
  };

  const setData = (user) => {
    const roleName = ROLES.find((r) => r.id === user.userRoleId);
    console.log(roleName);
    setId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(roleName.role);
    setRoleId(roleName.id);
    handleOpenForm();
  };

  const postUser = () => {
    if (validateData()) {
      createUser(name, email, password, role, token)
        .then((user) => {
          console.log(user);
          setOpenForm(false);
          getData();
        })
        .catch((err) => console.error(err));
    } else {
      handleOpenError();
      handleCloseError();
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

  const editUser = () => {
    if(validateData()){
    const roleName = ROLES.find((r) => r.role === role);
    const newUser = {
      name,
      userRoleId: roleName.id,
      email,
      password,
    };
    updateUser(id, newUser, token)
      .then((user) => {
        console.log(user);
        setOpenForm(false);
        getData();
      })
      .catch((err) => console.warn(err));
    } else {
      handleOpenError();
      handleCloseError();
    }
  };

  console.log(name);
  return (
    <div className="row">
      <SidebarBackoffice />
      <div className="col-12 col-md-10 p-0">
        <Box
          sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}
          
        >
          <div className="table-head-item">
            <button
              onClick={() => handleOpenSidebar()}
              className="btn hamburguer-button"
             
            >
              <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
            <Button className="btn-open-form" onClick={handleOpenForm}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Button>
          </div>

          <TableContainer component={Paper} className="table-content" sx={{height: '80%'}}>
            {!itemsToShow() ? (
              <div className="spinner-table-loading">
                <SpinnerLoading />
              </div>
            ) : (
              <Table
                size="medium"
                aria-label="a dense table"
                className="table-content"
                sx={{ height: "max-content" }}
              >
                <TableHead>
                  <Modal
                    open={openError}
                    onClose={handleCloseError}
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
                        ¡Error de validación de los campos!
                      </Typography>
                    </Box>
                  </Modal>

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
                        <TextField
                          value={name}
                          type="text"
                          className="input"
                          id="outlined-basic"
                          placeholder="nombre"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                          className="input"
                          type="email"
                          value={email}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                          className="input"
                          type="password"
                          value={password}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="contraseña"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                          className="input"
                          type="password"
                          value={passRepeat}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="repite contraseña"
                          onChange={(e) => setPassRepeat(e.target.value)}
                        />
                        <div class="dropdown d-flex justify-content-center">
                          <button
                            className="btn btn-dropdown dropdown-toggle"
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {role === "user" ? "Usuario" : "Administrador"}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-left"
                            aria-labelledby="dropdownMenu2"
                          >
                            <button
                              value={"user"}
                              onClick={(e) => setRole(e.target.value)}
                              className="dropdown-item"
                              type="button"
                            >
                              Usuario
                            </button>
                            <button
                              value={"admin"}
                              onClick={(e) => setRole(e.target.value)}
                              className="dropdown-item"
                              type="button"
                            >
                              Administrador
                            </button>
                          </div>
                        </div>
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="typo-flex">
                          <Button
                            onClick={() => postUser()}
                            className="btn-modal-form"
                          >
                            Crear
                          </Button>{" "}
                          <Button
                            onClick={() => editUser()}
                            className="btn-modal-form"
                          >
                            Actualizar
                          </Button>
                        </div>
                      </Typography>
                    </Box>
                  </Modal>

                  <TableRow>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Rol
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(user)}
                      >
                        {user.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(user)}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(user)}
                      >
                        {user.userRoleId}
                      </TableCell>
                      <TableCell
                        sx={{ color: pink[600] }}
                        align="left"
                        onClick={() => handleOpenDelete(user._id)}
                      >
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </div>
      </div>
  );
};

export default UserBackoffice;
