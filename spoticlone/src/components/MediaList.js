import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import SpinnerLoading from "./common/SpinnerLoading";
import theme from "../palette/palette";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const MediaList = ({ songs, artists, filter }) => {
  return (
    <TableContainer
      className="table-content"
      sx={{ maxHeight: 440 }}
    >
      <Table
        size="medium"
        className="table-content"
        aria-label="sticky table"
      >
        <TableHead className="sticky-header">
          <TableRow>
            <TableCell
              style={{ color: theme.palette.secondary.grey }}
              align="left"
            >
              #
            </TableCell>
            <TableCell
              style={{ color: theme.palette.secondary.grey }}
              align="left"
            >
              TÍTULO
            </TableCell>
            <TableCell
              style={{ color: theme.palette.secondary.grey }}
              align="left"
            >
              ARTISTA
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            songs?.map((song, index) => {
              return (
                <TableRow key={song._id}>
                  <TableCell style={{ color: theme.palette.secondary.light }} align="left">{index + 1}</TableCell>
                  <TableCell style={{ color: theme.palette.secondary.light }} align="left">{song.name}</TableCell>
                  <TableCell style={{ color: theme.palette.secondary.light }} align="left">{song.artistName}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MediaList.defaultProps = {
  songs: [],
  artists: [],
  filter: "",
};

MediaList.propTypes = {
  songs: PropTypes.array,
  artists: PropTypes.array,
  filter: PropTypes.string,
};

export default MediaList;
