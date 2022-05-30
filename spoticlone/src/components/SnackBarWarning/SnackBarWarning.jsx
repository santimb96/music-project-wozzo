import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackBarWarning = ({ open, msg, handleWarningClose }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  autoHideDuration={2000} onClose={handleWarningClose}>
      <Alert onClose={handleWarningClose} severity="warning" sx={{ width: "100%", fontSize: '12px' }} >
      {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarWarning;