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
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const MediaList = ({ songs, filter, itemSelected, next, selectedSong }) => {
  const [text, setText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  const playRef = useRef();
  const playingRefIndex = useRef();
  const tableRef = useRef();

  useEffect(() => {}, []);

  useEffect(() => {
    const filtered = songs?.filter((song) => {
      if (text[0] !== " ") {
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
      } else {
        return false;
      }
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

  const songSelected = (song, element, index) => {
    if (typeof playRef.current === "undefined") {
      playRef.current = element;
    }
    playRef.current.classList.remove("song-row-playing");

    element.classList.add("song-row-playing");
    playRef.current = element;
    playingRefIndex.current = index;

    itemSelected(song, index);
  };

  useEffect(() => {
    if (next !== false) {
      const nextIndex =
        songs.findIndex((song) => song._id === selectedSong._id) + 1 ===
        songs.length
          ? 0
          : songs.findIndex((song) => song._id === selectedSong._id) + 1;
      const nextSong = songs[nextIndex];
      songSelected(nextSong, tableRef.current.childNodes[nextIndex], nextIndex);
    }
  }, [next]);

  const msg = (element) => (
    <div className="col-12 d-flex justify-content-center align-items-center">
      {element}
    </div>
  );

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center table-container">
        {!songs.length || songs === null ? (
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
                {itemsToShow()?.map((song, index) => {
                  return (
                    <TableRow
                      onDoubleClick={(e) =>
                        songSelected(song, e.currentTarget, index)
                      }
                      key={song._id}
                      value={index}
                      className="song-row-home"
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
                        {playingRefIndex.current === index ? (
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
          {itemsToShow()?.length || itemsToShow()
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
