import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../../components/SidebarBackoffice/SidebarBackoffice";
import { getRoles } from "../../services/roles";
import Box from "@mui/material/Box";
import theme from "../../palette/palette.js";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import { TextField } from "@mui/material";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import SnackBarSuccess from "../../components/SnackBarSuccess/SnackBarSuccess";
import './index.scss';


const UserRoleBackoffice = () => {
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState(null);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [text, setText] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  
  /**
   *
   * SNACK SUCCESS
   */
   const handleSuccessClose = () => setSuccessOpen(false);
   /**
    *
    * SNACK ERROR
    */
   const handleErrorClose = () => setErrorOpen(false);
   
  useEffect(() => {
    getRoles(token)
      .then((rol) => {
        setRoles(rol?.userRoles);
      })
      .catch((err) => {
        setErrorOpen(true);
      });
  }, []);

  useEffect(() => {
    const filtered = roles?.filter((role) => {
      if (
        role.name.toLowerCase().includes(text.toLowerCase().trim()) ||
        role._id.includes(text.trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredRoles(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredRoles;
    }
    return roles;
  };


  return (
    <div className="row">
      <SidebarBackoffice />
      <div className="col-12 col-md-10 p-0">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item">
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {!itemsToShow() ? (
            <div className="spinner-table-loading">
              <SpinnerLoading />
            </div>
          ) : (
            <Table
              size="small"
              aria-label="a dense table"
              className="table-content"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ color: theme.palette.secondary.mainLight }}
                    align="left"
                  >
                    Id
                  </TableCell>
                  <TableCell
                    style={{ color: theme.palette.secondary.mainLight }}
                    align="left"
                  >
                    Rol
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="pointer-table">
                {itemsToShow()?.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      {user._id}
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      {user.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </div>
      <SnackBarSuccess
        open={successOpen}
        handleSuccessClose={handleSuccessClose}
      />
      <SnackBarError open={errorOpen} handleErrorClose={handleErrorClose} />
    </div>
  );
};

export default UserRoleBackoffice;
