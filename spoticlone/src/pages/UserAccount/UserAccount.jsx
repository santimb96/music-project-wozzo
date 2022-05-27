import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import './index.scss';
import { checkEmailOnRegister, checkPasswordLength } from "../../utils/validators";
import { updateProfile } from "../../services/user";

function UserAccount() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  const validateData = () => {
    if(checkEmailOnRegister(email) && checkPasswordLength(password) && name?.length > 6) {
      return true;
    } else {
      return false;
    }
  }

  const updateData = () => {
    if(validateData()){
      const data = {
        name: name,
        email: email,
        password: password,
      };

      updateProfile(user?._id, data)
        .then(()=> {
          console.log('done!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
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
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
        />
        <div className="submit-button">
          <button className="btn btn-submit-data" onClick={() => updateData()}>
            Actualizar
          </button>
        </div>
        <div className="advice-container">
          <small>NO todos los campos son obligatorios</small>
        </div>
      </div>
    </div>
  );
}

UserAccount.propTypes = {};

export default UserAccount;
