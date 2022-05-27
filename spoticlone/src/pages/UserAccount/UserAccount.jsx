import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import PropTypes from "prop-types";

function UserAccount() {
  const { user } = useContext(AuthContext);

  const [nameToUpdate, setNameToUpdate] = useState(user?.name);
  const [emailToUpdate, setEmailToUpdate] = useState(user?.email);
  const [passwordToUpdate, setPasswordToUpdate] = useState("");

  const updateData = () => {
    const data = {
      name: nameToUpdate,
      email: emailToUpdate,
      password: passwordToUpdate,
    };
    console.log(data);
  };

  return (
    <div className="account-contaner">
      <div className="user-content">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={nameToUpdate}
          onChange={(e) => setNameToUpdate(e.target.value)}
          type="text"
          placeholder="Nombre"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={emailToUpdate}
          onChange={(e) => setEmailToUpdate(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          value={passwordToUpdate}
          onChange={(e) => setPasswordToUpdate(e.target.value)}
          type="password"
          placeholder="Contraseña"
        />
        <div className="submit-button">
          <button className="btn btn-submit-data" onClick={() => updateData()}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}

UserAccount.propTypes = {};

export default UserAccount;
