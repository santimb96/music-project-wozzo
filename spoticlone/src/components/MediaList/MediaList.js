import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import theme from "../../palette/palette";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const MediaList = ({ songs, filterText, onSelectSong, song }) => {

  const tableRef = useRef();

  const msg = (element) => (
    <div className="col-12 d-flex justify-content-center align-items-center">
      {element}
    </div>
  );

  return (
    <div className="row contaner-list">
      <div className="col-12 d-flex justify-content-center table-container">
        {songs?.length === 0 && filterText !== "" ? (
          msg(<h2 className="text-light">No hay resultados</h2>)
        ) : !songs.length || songs === null ? (
          <div className="row">
            {msg(
              <div className="spinner-table-loading">
                <SpinnerLoading />
              </div>
            )}
          </div>
        ) : (
          <TableContainer className="table-content" sx={{ maxHeight: 440 }}>
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
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody ref={tableRef}>
                {songs?.map((s, index) => {
                  return (
                    <TableRow
                      onDoubleClick={(e) =>
                        onSelectSong(index)
                      }
                      key={s._id}
                      value={index}
                      className={`song-row-home ${song?._id === s?._id ? "song-row-playing" : ""}`}
                    >
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
                        {s.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        {s.artistName}
                      </TableCell>

                      <TableCell
                        style={{ color: theme.palette.secondary.light }}
                        align="left"
                      >
                        {song?._id === s?._id ? (
                          <i className="fa-solid fa-play play-row-button"></i>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div className="col 12 songs-found">
        <p>
          {songs.length
            ? `${songs.length} canciones encontradas`
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
