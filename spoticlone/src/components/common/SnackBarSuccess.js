import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackBarSuccess = ({ open, handleSuccessClose }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleSuccessClose}>
      <Alert onClose={handleSuccessClose} severity="success" sx={{ width: "20%" }}>
      ¡Operación con éxito!
      </Alert>
    </Snackbar>
  );
};

export default SnackBarSuccess;
