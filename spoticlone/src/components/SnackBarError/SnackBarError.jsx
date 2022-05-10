import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './index.scss';

const SnackBarError= ({ open, handleErrorClose }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleErrorClose}>
      <Alert onClose={handleErrorClose} severity="error" sx={{ width: "20%" }}>
      ¡Ha ocurrido un error!
      </Alert>
    </Snackbar>
  );
};

export default SnackBarError;
