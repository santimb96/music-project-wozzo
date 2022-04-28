import React from "react";
import Button from "@mui/material/Button";
import './index.scss';

const CreateButton = ({handleOpenForm, loading}) => {

  const open = (boolean) => {
    handleOpenForm(boolean);
  }

  return (
    <Button disabled={loading}  className="btn-open-form" onClick={() => open(true)}>
      <i className="fa fa-plus me-1"></i> CREAR
    </Button>
  );
};

export default CreateButton;
