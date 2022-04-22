import React from "react";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import { yellow } from "@mui/material/colors";
const EditButton = ({ setData, item }) => {

  const send = (item) => {
    setData(item);
  }

  return (
    <TableCell
      sx={{ color: yellow[600] }}
      align="left"
      onClick={() => send(item)}
    >
      <div className="edit-button-table">
        <EditIcon />
      </div>
    </TableCell>
  );
};

export default EditButton;
