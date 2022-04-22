import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "../services/user.js";
import { getRoles } from "../services/roles.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { pink, yellow } from "@mui/material/colors";
import ROLES from "../utils/roleId";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE } from "../constants";
import ButtonCreate from "../components/common/ButtonCreate";
import ModalDelete from "../components/common/ModalDelete";
import EditButton from "../components/common/EditButton";
import DeleteButton from "../components/common/DeleteButton";

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(null);
  const [roles, setRoles] = useState(null);
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
  const [responseStatus, setResponseStatus] = useState(true);
  const [create, setCreate] = useState(false);
  const [errors, setErrors] = useState(false);

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

  const handleOpenForm = (post = false) => {
    if (post) {
      setCreate(true);
      setErrors(false);
      setOpenForm(true);
    } else {
      setErrors(false);
      setOpenForm(true);
    }
  };

  const handleCloseForm = () => {
    clearData();
    setErrors(false);
    setCreate(false);
    setOpenForm(false);
  };

  const getData = () => {
      Promise.all([getUsers(token), getRoles(token)]).then(([usersResponse, rolesResponse]) => {
        setRoles(rolesResponse.userRoles);
        const data = usersResponse.users.map(user => {
          const role = rolesResponse.userRoles.find(role => role._id === user.userRoleId);
          return {
            ...user,
            roleName: role.name,
          };
        })
        setUsers(data);
      }).catch(err => console.warn(err));
    // getUsers(token)
    //   .then((user) => {
    //     setUsers(user?.users);
    //   })
    //   .catch((err) => console.warn(err));
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

  const validateData = (method = false) => {
    const checkPassword = () =>
      password === passRepeat && email.indexOf("@") !== -1;
    if (method) {
      if (name?.length && email?.length && role) {
        if (checkPassword()) {
          return true;
        }
        return false;
      }
    } else {
      if (
        name?.length &&
        email?.length &&
        password?.length &&
        passRepeat?.length
      ) {
        if (checkPassword()) {
          return true;
        }
        return false;
      }
    }
  };

  const setData = (user) => {
    const roleName = ROLES.find((r) => r.id === user.userRoleId);
    setId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(roleName.role);
    setRoleId(roleName.id);
    handleOpenForm();
  };

  const postUser = () => {
    if (validateData()) {
      setResponseStatus(false);
      createUser(name, email, password, role, token)
        .then((user) => {
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.error(err));
    } else {
      setErrors(true);
      handleOpenError();
      handleCloseError();
    }
  };

  const deleteItem = (id) => {
    setResponseStatus(false);
    removeUser(id, token)
      .then(() => {
        getData();
        setText("");
        setOpenDelete(false);
        setResponseStatus(true);
      })
      .catch((err) => console.error(err));
  };

  const editUser = (method) => {
    if (validateData(method)) {
      setResponseStatus(false);
      const roleName = ROLES.find((r) => r.role === role);
      const newUser = {
        name,
        userRoleId: roleName.id,
        email,
        password,
      };
      updateUser(id, newUser, token)
        .then(() => {
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.warn(err));
    } else {
      setErrors(true);
      handleOpenError();
      handleCloseError();
    }
  };

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassRepeat("");
    setRole("user");
    setId("");
    setRoleId(null);
  };

  return (
    <div className="row">
      <SidebarBackoffice />
      <div className="col-12 col-md-10 p-0">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
            <ButtonCreate handleOpenForm={handleOpenForm} />
          </div>

          <TableContainer
            component={Paper}
            className="table-content"
            sx={{ height: "80%" }}
          >
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
                  <ModalDelete
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    responseStatus={responseStatus}
                    deleteItem={deleteItem}
                    id={id}
                  />

                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <div>
                        <div>
                          <h2 className="d-flex justify-content-center pb-4">
                            {create ? "Crear usuario" : "Actualizar usuario"}
                          </h2>
                        </div>
                        <label htmlFor="nombre">Nombre*</label>
                        <TextField
                          value={name}
                          type="text"
                          className="input"
                          id="name"
                          placeholder="nombre"
                          onChange={(e) => setName(e.target.value)}
                          error={errors && name?.length === 0}
                          helperText={
                            errors && name?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        <label htmlFor="email">Email*</label>
                        <TextField
                          className="input"
                          type="email"
                          value={email}
                          id="email"
                          variant="outlined"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                          error={errors && email?.length === 0}
                          helperText={
                            errors && email?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        {create ? (
                          <>
                            <label htmlFor="password">Contraseña*</label>
                            <TextField
                              className="input"
                              type="password"
                              value={password}
                              id="password"
                              variant="outlined"
                              placeholder="contraseña"
                              onChange={(e) => setPassword(e.target.value)}
                              error={errors && password?.length === 0}
                              helperText={
                                errors && password?.length === 0
                                  ? EMPTY_FIELD_MESSAGE
                                  : " "
                              }
                            />
                            <label htmlFor="passRepeat">
                              Repite contraseña*
                            </label>
                            <TextField
                              className="input"
                              type="password"
                              value={passRepeat}
                              id="passRepeat"
                              variant="outlined"
                              placeholder="repite contraseña"
                              onChange={(e) => setPassRepeat(e.target.value)}
                              error={errors && passRepeat?.length === 0}
                              helperText={
                                errors && passRepeat?.length === 0
                                  ? EMPTY_FIELD_MESSAGE
                                  : " "
                              }
                            />
                          </>
                        ) : (
                          ""
                        )}
                        <label htmlFor="role">Rol*</label>
                        <div class="dropdown d-flex justify-content-center">
                          <button
                            className="btn btn-dropdown dropdown-toggle"
                            type="button"
                            id="role"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {role === "user" ? "Usuario" : "Administrador"}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-left"
                            aria-labelledby="role"
                          >
                            {roles?.map((role) => (
                              <button
                              key={role.name}
                              value={role.name}
                              onClick={(e) =>  setRole(role.name)}
                              className="dropdown-item"
                              type="button"
                            >
                              {role.name === "user" ? "Usuario" : "Administrador"}
                            </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {responseStatus ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                onClick={() => postUser()}
                                className="btn-modal-form"
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                                onClick={() => editUser(true)}
                                className="btn-modal-form"
                              >
                                Actualizar
                              </Button>
                            )}
                          </div>
                        </Typography>
                      ) : (
                        <Typography className="d-flex justify-content-center ">
                          <SpinnerLoading />
                        </Typography>
                      )}
                      <small>*Campos requeridos</small>
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
                      Editar
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Borrar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pointer-table">
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
                      >
                        {user.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {user.roleName}
                      </TableCell>
                      <EditButton setData={setData} item={user} />
                      <DeleteButton handleOpenDelete={handleOpenDelete} id={user._id}/>
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
