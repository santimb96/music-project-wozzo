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
  const [text, setText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    const filtered = songs?.filter((song) => {
      if (
        song.name
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim()) ||
        song.artistName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });

    setFilteredSongs(filtered);
  }, [text]);

  useEffect(() => {
    setText(filter);
  }, [filter]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredSongs;
    }
    return songs;
  };

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <TableContainer className="table-content" sx={{ maxHeight: 440 }}>
          {!itemsToShow().length ? (
            <div className="msg-songs-not-found">
              <h2>No se han encontrado resultados</h2>
            </div>
          ) : (
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
                  <TableCell
                    style={{ color: theme.palette.secondary.grey }}
                    align="left"
                  >
                    REPRODUCIR
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsToShow()?.map((song, index) => {
                  return (
                    <TableRow key={song._id} className="song-row-home">
                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        {song.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        {song.artistName}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        <i className="fa-solid fa-play play-row-button"></i>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      <div className="col 12 songs-found">
        <p>
          {itemsToShow()?.length
            ? `${itemsToShow()?.length} canciones encontradas`
            : ""}
        </p>
      </div>
    </div>
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
