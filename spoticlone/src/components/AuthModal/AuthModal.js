import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE, EMAIL_NOT_VALID_MESSAGE } from "../../constants";
import {
  checkEmail,
  checkEmailOnRegister,
  checkPassword,
} from "../../utils/validators.js";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/user";
import "./index.scss";

const AuthModal = ({ isOpen, restartFormStatus }) => {
  // USER CONTEXT
  const authContext = useContext(AuthContext);
  // NAVIGATE

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [registerState, setRegisterState] = useState(true);

  // LOGIN FIELDS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // REGISTER FIELDS
  const [name, setName] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const role = "user";

  const [errorsLogin, setErrorsLogin] = useState(false);
  const [errorsRegister, setErrorsRegister] = useState(false);

  const handleCloseForm = () => {
    setOpen(false);
    setErrorsLogin(false);
    setErrorsRegister(false);
  }
  //const handleOpenForm = () => setOpen(true);

  const isLogin = () => {
    setLoginState(true);
    setRegisterState(false);
  };

  const isRegister = () => {
    setLoginState(false);
    setRegisterState(true);
  };

  const onLogin = () => {
    if (validateData()) {
      setLoading(true);
      login(email, password)
        .then((user) => {
          authContext.setUser(user.user);
          authContext.setUserRole(user.role);
          localStorage.setItem("userId", user.user._id);
          localStorage.setItem("token", user.token);
          localStorage.setItem("expiryDate", user.expiryDate);
          clearData();
          setLoginState(false);
          setLoading(false);
          setOpen(false);
          // handleCloseForm();
          user.role === "admin" ? navigate("/backoffice/roles") : window.location.reload();;
        })
        .catch(() => {
          clearData();
          navigate("/");
        });
    } else {
      setErrorsLogin(true);
    }
  };

  const onRegister = () => {
    if (validateData()) {
      setLoading(true);
      register(name, email, password, role)
        .then((user) => {
          clearData();
          setRegisterState(false);
          setLoading(false);
          setOpen(false);
          window.location.reload();
        })
        .catch(() => {
          clearData();
          navigate("/");
        });
    } else {
      setErrorsRegister(true);
    }
  }

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassRepeat("");
  };

  const validateData = () => {
    if (loginState) {
      if (email?.length && password?.length) {
        if (checkEmailOnRegister(email)) {
          return true;
        }
        return false;
      }
    } else {
      if (
        name?.length &&
        email?.length &&
        password?.length &&
        passRepeat?.length &&
        role
      ) {
        if (
          checkPassword(password, passRepeat) &&
          checkEmailOnRegister(email)
        ) {
          return true;
        }
        return false;
      }
    }
  };

  useEffect(() => {
    if (isOpen.status) {
      if(isOpen.type === "login"){
          setRegisterState(false);
          setLoginState(true);
          setOpen(isOpen.status);
        } else {

          setLoginState(false);
          setRegisterState(true);
          setOpen(isOpen.status);
        }
    }
  }, [isOpen]);

  return (
    <Modal
      open={open}
      onClose={handleCloseForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <Box className="modal-delete">
        <div onClick={handleCloseForm} className="d-flex justify-content-end">
          <button
            {...(loading ? { disabled: true } : {})}
            className="close-modal-button"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="d-flex justify-content-around m-2">
          <button
            onClick={() => isLogin()}
            className={
              loginState
                ? "btn-modal-form-active mb-2 mt-2"
                : "btn-modal-auth mb-2 mt-2"
            }
            disabled={loading}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => isRegister()}
            className={
              registerState
                ? "btn-modal-form-active mb-2 mt-2"
                : "btn-modal-auth mb-2 mt-2"
            }
            disabled={loading}
          >
            Registrarse
          </button>
        </div>
        <div className="d-flex flex-column">
          
          {registerState ? (
            <>
              <label htmlFor="name">Nombre*</label>
              <TextField
                disabled={loading}
                value={name}
                type="text"
                className="input"
                id="name"
                placeholder="nombre"
                onChange={(e) => setName(e.target.value)}
                error={errorsRegister && name?.length === 0}
                helperText={
                  errorsRegister && name?.length === 0 ? EMPTY_FIELD_MESSAGE : " "
                }
              />
            </>
          ) : (
            ""
          )}
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
              ((errorsLogin || errorsRegister) && email?.length === 0) || ((errorsLogin || errorsRegister) && !checkEmail(email))
            }
            helperText={
              (errorsLogin || errorsRegister) && email?.length === 0
                ? EMPTY_FIELD_MESSAGE
                : (errorsLogin || errorsRegister) && !checkEmail(email)
                ? EMAIL_NOT_VALID_MESSAGE
                : ""
            }
          />

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
            error={(errorsLogin || errorsRegister) && password?.length === 0}
            helperText={
              (errorsLogin || errorsRegister) && password?.length === 0 ? EMPTY_FIELD_MESSAGE : " "
            }
          />
        </div>

        {registerState ? (
          <>
            <label htmlFor="passRepeat">Repite contraseña*</label>
            <TextField
              disabled={loading}
              className="input"
              type="password"
              value={passRepeat}
              id="passRepeat"
              variant="outlined"
              placeholder="repite contraseña"
              onChange={(e) => setPassRepeat(e.target.value)}
              error={errorsRegister && passRepeat?.length === 0}
              helperText={
                errorsRegister && passRepeat?.length === 0 ? EMPTY_FIELD_MESSAGE : ""
              }
            />
          </>
        ) : (
          ""
        )}

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="typo-flex">
            <button
              onClick={() => (loginState ? onLogin() : onRegister())}
              className="auth-buttons"
              disabled={loading}
            >
              {loginState ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </div>
        </Typography>
        {loading ? (
          <Typography className="d-flex justify-content-center ">
            <SpinnerLoading />
          </Typography>
        ) : (
          ""
        )}
        <small className="small-style">*Campos requeridos</small>
      </Box>
    </Modal>
  );
};

export default AuthModal;
