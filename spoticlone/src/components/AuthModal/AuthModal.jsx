import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE, EMAIL_NOT_VALID_MESSAGE } from "../../constants";
import {
  checkEmail,
  checkEmailOnRegister,
  checkPassword,
  checkPasswordLength,
} from "../../utils/validators.js";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext, { MODAL_STATES } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/user";
import SnackBarError from "../SnackBarError/SnackBarError";
import "./index.scss";

const AuthModal = () => {
  // USER CONTEXT
  const {
    showAuthModal,
    setAuthModalType,
    setUser,
    setUserRole,
    authModalType,
    setShowAuthModal,
  } = useContext(AuthContext);
  // NAVIGATE
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // LOGIN FIELDS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // REGISTER FIELDS
  const [name, setName] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const role = "user";

  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleErrorClose= () => setShowError(false);

  //CLOSE FORM

  const handleCloseForm = () => {
    setShowAuthModal(false);
    setErrors(false);
  };

  const changeModalType = (type) => {
    setErrors(false);
    setAuthModalType(type);
  };

  //LOGIN SYSTEM

  const onLogin = () => {
    if (validateData()) {
      setErrorMessage(null);
      setLoading(true);
      login(email, password)
        .then((user) => {
          setUser(user.user);
          setUserRole(user.role);
          localStorage.setItem("userId", user.user._id);
          localStorage.setItem("token", user.token);
          localStorage.setItem("expiryDate", user.expiryDate);
          setShowAuthModal(false);
          if (user.role === "admin") {
            navigate("/backoffice/roles");
          }
        })
        .catch(() => {
          // todo show error message
          setLoading(false);
          setErrorMessage("Usuario o contraseña incorrectos");
        })
        .finally(() => setLoading(false));
    } else {
      setErrorMessage(null);
      setErrors(true);
    }
  };

  //REGISTER SYSTEM

  const onRegister = () => {
    if (validateData()) {
      setErrorMessage(null);
      setLoading(true);
      register(name, email, password, role)
        .then((res) => {
          //FIXME: ERROR VAYA AL CATCH Y NO AL THEN
          if(res?.error){
            console.log('catched!')
            setLoading(false);
            setShowError(true);
          } else {
            console.log(res);
            clearData();
            setAuthModalType(MODAL_STATES.REGISTER);
            setLoading(false);
            setShowAuthModal(false);  
          }
        })
        .catch(() => {
          console.log('catched!')
          setLoading(false);
          setShowError(true);
        });
    } else {
      setErrors(true);
    }
  };

  //CLEAR ALL DATA AFTER EACH OPERATION

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassRepeat("");
  };

  //VALIDATE DATA FROM STATES(FORM FIELDS)

  const validateData = () => {
    if (authModalType === MODAL_STATES.LOGIN) {
      if (email?.length && checkPasswordLength(password)) {
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
          checkEmailOnRegister(email) &&
          checkPasswordLength(password)
        ) {
          return true;
        }
        return false;
      }
    }
  };

  return (
    <>
    <div>
      <Modal
        open={showAuthModal}
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
          {errorMessage && (
            <div className="text-danger justify-content-center">
              <p className="text-center">{errorMessage}</p>
            </div>
          )}
          <div className="d-flex justify-content-around m-2">
            <button
              onClick={() => changeModalType(MODAL_STATES.LOGIN)}
              className={
                authModalType === MODAL_STATES.LOGIN
                  ? "btn-modal-form-active mb-2 mt-2"
                  : "btn-modal-auth mb-2 mt-2"
              }
              disabled={loading}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => changeModalType(MODAL_STATES.REGISTER)}
              className={
                authModalType === MODAL_STATES.REGISTER
                  ? "btn-modal-form-active mb-2 mt-2"
                  : "btn-modal-auth mb-2 mt-2"
              }
              disabled={loading}
            >
              Registrarse
            </button>
          </div>
          <div className="d-flex flex-column">
            {authModalType === MODAL_STATES.REGISTER && (
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
                  error={errors && name?.length === 0}
                  helperText={
                    errors && name?.length === 0 ? EMPTY_FIELD_MESSAGE : " "
                  }
                />
              </>
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
              error={(errors || errors) && password?.length === 0}
              helperText={
                errors && password?.length === 0 ? EMPTY_FIELD_MESSAGE : " "
              }
            />
          </div>

          {authModalType === MODAL_STATES.REGISTER && (
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
                error={errors && passRepeat?.length === 0}
                helperText={
                  errors && passRepeat?.length === 0 ? EMPTY_FIELD_MESSAGE : ""
                }
              />
            </>
          )}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="typo-flex">
              <button
                onClick={() =>
                  authModalType === MODAL_STATES.LOGIN
                    ? onLogin()
                    : onRegister()
                }
                className="auth-buttons"
                disabled={loading}
              >
                {authModalType === MODAL_STATES.LOGIN
                  ? "Iniciar Sesión"
                  : "Registrarse"}
              </button>
            </div>
          </Typography>
          {loading && (
            <Typography className="d-flex justify-content-center ">
              <SpinnerLoading />
            </Typography>
          )}
          <small className="small-style">*Campos requeridos</small>
        </Box>
      </Modal>
    </div>
    <SnackBarError open={showError} handleErrorClose={handleErrorClose} />
    </>
  );
};

export default AuthModal;
