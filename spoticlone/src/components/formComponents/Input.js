import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import LoginContext from "../../contexts/LoginContext";

const Input = ({name, onChange}) => {

  const emailContext = useContext(LoginContext);
  console.log(emailContext);

  const onChangeValue = (inputValue) => { 
    emailContext.setLogin().email((inputValue.target.value).toLowerCase().trim())
  }

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
