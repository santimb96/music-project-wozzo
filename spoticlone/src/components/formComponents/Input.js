import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import LoginContext from "../../contexts/LoginContext";

const Input = ({name}) => {

  const loginContext = useContext(LoginContext);
  //const {email, password} = loginContext.login;


  console.log(loginContext);

  const onChangeValue = (inputValue) => {
    if (name === "Email") {
    loginContext.setLogin({email: inputValue.target.value, password: loginContext.login.password});
  } else if (name === "Contraseña") {
    loginContext.setLogin({email: loginContext.login.email ,password: inputValue.target.value});
  }
};

  return (
    <div className="col-12">
      <label>{name}</label>
      <input
        onChange={onChangeValue}
        type="text"
        name={name}
        className="form-control"
        placeholder={name}
      />
    </div>
  );
};


Input.defaultProps = {
  name: 'default'
}

Input.propTypes = {
  name: PropTypes.string.isRequired
}

export default Input;