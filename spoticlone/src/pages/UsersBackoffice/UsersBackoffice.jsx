import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "../../services/user.js";
import { getRoles } from "../../services/roles.js";
import Box from "@mui/material/Box";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import theme from "../../palette/palette.js";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import ROLES from "../../utils/roleId";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE, EMAIL_NOT_VALID_MESSAGE } from "../../constants";
import CreateButton from "../../components/CreateButton/CreateButton";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import EditButton from "../../components/EditButton/EditButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { checkEmail, checkPassword } from "../../utils/validators.js";
import SnackBarSuccess from "../../components/SnackBarSuccess/SnackBarSuccess";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import CloseIcon from "@mui/icons-material/Close";
import sortItems from "../../utils/sortItems";

const UsersBackoffice = () => {
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
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [errors, setErrors] = useState(false);

  /**
   *
   * SNACK SUCCESS
   */
  const handleSuccessClose = () => setSuccessOpen(false);
  /**
   *
   * SNACK ERROR
   */
  const handleErrorClose = () => setErrorOpen(false);

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
    Promise.all([getUsers(token), getRoles(token)])
      .then(([usersResponse, rolesResponse]) => {
        setRoles(rolesResponse.userRoles);
        const data = usersResponse.users.map((user) => {
          const role = rolesResponse.userRoles.find(
            (role) => role._id === user.userRoleId
          );
          console.warn(user);
          return {
            ...user,
            roleName: role.name,
          };
        });
        setUsers(data);
      })
      .catch((err) => setErrorOpen(true));
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
      return sortItems(filteredUsers ? filteredUsers : users);
    }
    return sortItems(users ? users : []);
  };

  const validateData = (method = false) => {
    if (method) {
      if (name?.length && email?.length && role) {
        if (checkEmail(email)) {
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
        if (checkPassword(password, passRepeat) && checkEmail(email, users)) {
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
    handleOpenForm();
  };

  const postUser = () => {
    if (validateData()) {
      setLoading(true);
      createUser(name, email, password, role)
        .then(() => {
          setOpenForm(false);
          setLoading(false);
          setSuccessOpen(true);
          setCreate(false);
          clearData();
          getData();
        })
        .catch(() => {
          setLoading(false);
          setErrorOpen(true);
        });
    } else {
      setLoading(false);
      setErrorOpen(true);
      setErrors(true);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    removeUser(id, token)
      .then(() => {
        getData();
        setText("");
        setOpenDelete(false);
        setSuccessOpen(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorOpen(true);
      });
  };

  const editUser = (method) => {
    if (validateData(method)) {
      setLoading(true);
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
          setLoading(false);
          setSuccessOpen(true);
          clearData();
          getData();
        })
        .catch(() => {
          setLoading(false);
          setErrorOpen(true);
        });
    } else {
      setLoading(false);
      setErrors(true);
    }
  };

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassRepeat("");
    setRole("user");
    setId("");
  };

  return (
    <div className="row">
      {!loading ? <Sidebar /> : <div className="col-12 col-md-2 bg-dark"></div>}
      <div className="backoffice-container">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
            <input
              type="search"
              class="input-search-home"
              placeholder="Usuario o correo"
              disabled={loading}
              onChange={(e) => setText(e.target.value)}></input>
            <CreateButton handleOpenForm={handleOpenForm} />
          </div>

          <TableContainer
            component={Paper}
            className="table-content"
            sx={{ height: "80%" }}>
            {!itemsToShow() ? (
              <div className="spinner-table-loading">
                <SpinnerLoading />
              </div>
            ) : (
              <Table
                size="medium"
                aria-label="sticky table"
                className="table-content"
                id="table"
                sx={{ height: "max-content" }}>
                <TableHead className="sticky-header">
                  <ModalDelete
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    loading={loading}
                    deleteItem={deleteItem}
                    id={id}
                  />

                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus>
                    <Box className="modal-delete">
                      <div
                        onClick={handleCloseForm}
                        className="d-flex justify-content-end">
                        <button
                          {...(loading ? { disabled: true } : {})}
                          className="close-modal-button">
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <h2 className="d-flex justify-content-center pb-4">
                            {create ? "Crear usuario" : "Actualizar usuario"}
                          </h2>
                        </div>
                        <label htmlFor="name">Nombre*</label>
                        <TextField
                          disabled={loading}
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
                          disabled={loading}
                          autoComplete="off"
                          className="input"
                          type="email"
                          value={email}
                          id="email"
                          variant="outlined"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                          error={
                            (errors && email?.length === 0) ||
                            (errors && !checkEmail(email))
                          }
                          helperText={
                            errors && email?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : errors && !checkEmail(email)
                              ? EMAIL_NOT_VALID_MESSAGE
                              : ""
                          }
                        />
                        {create ? (
                          <>
                            <label htmlFor="password">Contraseña*</label>
                            <TextField
                              disabled={loading}
                              autoComplete="off"
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
                              disabled={loading}
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
                                  : ""
                              }
                            />
                          </>
                        ) : (
                          ""
                        )}
                        <label htmlFor="role">Rol*</label>
                        <div className="dropdown d-flex justify-content-center">
                          <button
                            {...(loading ? { disabled: true } : {})}
                            id="drop"
                            className="btn btn-dropdown dropdown-toggle"
                            type="button"
                            //id="role"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            {role === "user" ? "Usuario" : "Administrador"}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-left"
                            aria-labelledby="role">
                            {roles?.map((role) => (
                              <button
                                {...(loading ? { disabled: true } : {})}
                                key={role.name}
                                value={role.name}
                                onClick={(e) => setRole(role.name)}
                                className="dropdown-item"
                                type="button">
                                {role.name === "user"
                                  ? "Usuario"
                                  : "Administrador"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {!loading ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                onClick={() => postUser()}
                                className="btn-modal-form"
                                disabled={loading}>
                                Crear
                              </Button>
                            ) : (
                              <Button
                                onClick={() => editUser(true)}
                                className="btn-modal-form"
                                disabled={loading}>
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
                      align="left">
                      Nombre
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left">
                      Email
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left">
                      Rol
                    </TableCell>

                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left">
                      Editar
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left">
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
                      }}>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left">
                        {user.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left">
                        {user.email}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left">
                        {user.roleName}
                      </TableCell>
                      <EditButton
                        setData={setData}
                        item={user}
                        loading={loading}
                      />
                      <DeleteButton
                        handleOpenDelete={handleOpenDelete}
                        id={user._id}
                        loading={loading}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </div>
      <SnackBarSuccess
        open={successOpen}
        handleSuccessClose={handleSuccessClose}
      />
      <SnackBarError open={errorOpen} handleErrorClose={handleErrorClose} />
    </div>
  );
};

export default UsersBackoffice;
