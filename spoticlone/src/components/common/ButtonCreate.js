import React from "react";
import Button from "@mui/material/Button";

const ButtonCreate = ({handleOpenForm}) => {

  const open = (boolean) => {
    handleOpenForm(boolean);
  }

  return (
    <Button className="btn-open-form" onClick={() => open(true)}>
      <i className="fa fa-plus me-1"></i> CREAR
    </Button>
  );
};

export default ButtonCreate;
