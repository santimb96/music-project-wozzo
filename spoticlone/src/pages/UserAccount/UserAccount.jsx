import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./index.scss";
import {
  checkEmailOnRegister,
  checkPasswordLength,
} from "../../utils/validators";
import SnackBarInfo from "../../components/SnackBarInfo/SnackBarInfo";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import SnackBarWarning from "../../components/SnackBarWarning/SnackBarWarning";
import { updateProfile } from "../../services/user";


function UserAccount() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  /*SNACKBARS */
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleInfoClose = () => setShowInfo(false);
  const handleWarningClose = () => setShowWarning(false);
  const handleErrorClose = () => setShowError(false);

  useEffect(() => {
    document.title = "Cuenta";
  }, []);

  const validateData = () => {
    if (checkEmailOnRegister(email) && name?.length > 6) {
      if (password?.length === 0) {
        return checkIfSameValues() ? false : true;
      } else if (checkPasswordLength(password)) {
        return checkIfSameValues() ? false : true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const checkIfSameValues = () => {
    if(user?.name === name && user?.email === email) {
      setShowWarning(true);
      return true;
    } else {
      return false;
    }
  };

  const updateData = () => {
    if (validateData()) {

      const data = {
        name,
        email,
        password,
      };

      if (password === "") delete data.password;

      updateProfile(user?._id, data)
        .then(() => {
          setShowInfo(true);
        })
        .catch(() => {
          setShowError(true);
        })
        .finally(() => setPassword(""));
    }
  };

  return (
    <>
      <div className="account-container">
        <div className="account-header">
          <h1>Cuenta de {user?.name}</h1>
        </div>
        <div className="user-content">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            autoComplete="new-password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
          />
          <div className="submit-button">
            <button
              className="btn btn-submit-data"
              onClick={() => updateData()}
            >
              Actualizar
            </button>
          </div>
          <div className="advice-container">
            <small>NO es necesario rellenar NI actualizar todos los campos</small>
          </div>
        </div>
      </div>
      <SnackBarInfo
        open={showInfo}
        msg={"Se ha actualizado tu perfil"}
        handleInfoClose={handleInfoClose}
      />
      <SnackBarWarning
        open={showWarning}
        msg={"Los valores son iguales a los anteriores. No se puede editar."}
        handleWarningClose={handleWarningClose}
      />
      <SnackBarError open={showError} handleErrorClose={handleErrorClose} />
    </>
  );
}

export default UserAccount;
