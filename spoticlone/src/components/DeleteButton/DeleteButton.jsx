import React from "react";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import './index.scss';

const DeleteButton = ({ handleOpenDelete, id, loading }) => {
  const open = (id) => {
    handleOpenDelete(id);
  };

  return (
    <TableCell
      sx={{ color: pink[600] }}
      align="left"
      disabled={loading}
    >
      <div className="delete-button-table">
        <button
          onClick={() => open(id)}
          className="button-icons"
          {...(loading ? { disabled: true } : {})}
        >
          <DeleteIcon />
        </button>
      </div>
    </TableCell>
  );
};

export default DeleteButton;
