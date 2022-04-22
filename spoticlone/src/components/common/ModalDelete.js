import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpinnerLoading from "./SpinnerLoading";

const ModalDelete = ({
  openDelete,
  handleCloseDelete,
  responseStatus,
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
      {responseStatus ? (
        <Box className="modal-delete">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Estás seguro de que quieres borrarlo?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="typo-flex">
              <Button
                onClick={() => deleteItem(id)}
                className="btn-modal btn-delete"
              >
                Sí
              </Button>{" "}
              <Button className="btn-modal " onClick={handleCloseDelete}>
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
