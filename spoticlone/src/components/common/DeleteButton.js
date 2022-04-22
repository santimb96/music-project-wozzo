import React from "react";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";

const DeleteButton = ({ handleOpenDelete, id }) => {

  const open = (id) => {
    handleOpenDelete(id);
  }

  return (
    <TableCell
      sx={{ color: pink[600] }}
      align="left"
      onClick={() => open(id)}
    >
      <div className="delete-button-table">
        <DeleteIcon />
      </div>
    </TableCell>
  );
};

export default DeleteButton;
