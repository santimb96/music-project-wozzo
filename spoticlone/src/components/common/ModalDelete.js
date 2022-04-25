import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpinnerLoading from "./SpinnerLoading";
import CloseIcon from '@mui/icons-material/Close';

const ModalDelete = ({
  openDelete,
  handleCloseDelete,
  loading,
  deleteItem,
  id,
}) => {


  return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      {!loading ? (
        <Box className="modal-delete">
          <div onClick={handleCloseDelete} className="d-flex justify-content-end">
            <button {...(loading ? { disabled: true } : {})}  className="close-modal-button">
            <CloseIcon />
            </button>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Estás seguro de que quieres borrarlo?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="typo-flex">
              <Button
                onClick={() => deleteItem(id)}
                className="btn-modal btn-delete"
                disabled={loading}
              >
                Sí
              </Button>{" "}
              <Button disabled={loading} className="btn-modal " onClick={handleCloseDelete}>
                No
              </Button>
            </div>
          </Typography>
        </Box>
      ) : (
        <Box className="modal-delete d-flex justify-content-center">
          <SpinnerLoading />
        </Box>
      )}
    </Modal>
  );
};

export default ModalDelete;
