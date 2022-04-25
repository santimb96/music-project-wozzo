import React from "react";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import { yellow } from "@mui/material/colors";
const EditButton = ({ setData, item, loading }) => {
  const send = (item) => {
    setData(item);
  };

  return (
    <TableCell
      sx={{ color: yellow[600] }}
      align="left"
    >
      <div className="edit-button-table">
        <button
        onClick={() => send(item)}
          className="button-icons"
          {...(loading ? { disabled: true } : {})}
        >
          <EditIcon />
        </button>
      </div>
    </TableCell>
  );
};

export default EditButton;
