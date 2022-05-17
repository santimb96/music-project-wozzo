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
import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import AuthContext from "../../contexts/AuthContext";

const MediaList = ({
  onSelectSong,
  onClickFavourite,
  filteredSongList,
  favouriteList,
  selectedSong,
}) => {
  const { user } = useContext(AuthContext);
  const tableRef = useRef();

  const msg = (element) => (
    <div className="d-flex justify-content-center align-items-center">
      {element}
    </div>
  );

  return (
    <div className="contaner-list">
      <div className="d-flex justify-content-center table-container">
        {!filteredSongList?.length || filteredSongList === null ? (
          msg(
            <div className="spinner-table-loading">
              <SpinnerLoading />
            </div>
          )
        ) : (
          <TableContainer className="table-content">
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
                    GÉNERO
                  </TableCell>

                  <TableCell
                    style={{ color: theme.palette.secondary.grey }}
                    align="left"
                  ></TableCell>

                  <TableCell
                    style={{ color: theme.palette.secondary.grey }}
                    align="left"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody ref={tableRef}>
                {filteredSongList
                  ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((s, index) => {
                    return (
                      <TableRow
                        onDoubleClick={() => onSelectSong(index, "mediaList")}
                        key={s._id}
                        value={index}
                        className={`song-row-home ${
                          selectedSong?._id === s?._id ? "song-row-playing" : ""
                        }`}
                      >
                        <TableCell
                          style={{ color: theme.palette.secondary.light }}
                          align="left"
                        >
                          {selectedSong?._id === s?._id ? (
                            <i className="fa-solid fa-play play-row-button"></i>
                          ) : (
                            index + 1
                          )}
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
                          {s.genreName}
                        </TableCell>
                        <TableCell
                          style={{ color: theme.palette.secondary.light }}
                          align="left"
                        >
                          {favouriteList?.find((f) => f?.songId === s?._id) &&
                          user?._id ? (
                            <i
                              onClick={() => onClickFavourite(s?._id, true)}
                              className="fa-solid fa-heart fav-icon-fav"
                            ></i>
                          ) : (
                            <i
                              onClick={() => onClickFavourite(s?._id, false)}
                              className="fa-regular fa-heart fav-icon"
                            ></i>
                          )}
                        </TableCell>
                        <TableCell
                          style={{ color: theme.palette.secondary.light }}
                          align="left"
                        ></TableCell>
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
          {filteredSongList.length
            ? `${filteredSongList.length} canciones encontradas`
            : ""}
        </p>
      </div>
    </div>
  );
};

MediaList.propTypes = {
  songs: PropTypes.array,
  favouriteSongs: PropTypes.array,
  filterText: PropTypes.string,
  onSelectSong: PropTypes.func.isRequired,
  song: PropTypes.object,
  onClickFavourite: PropTypes.func.isRequired,
};

export default MediaList;
