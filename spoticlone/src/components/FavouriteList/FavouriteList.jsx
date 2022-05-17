import React, { useRef } from "react";
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
import "./index.scss";

const FavouriteList = ({
  onSelectSong,
  songsFavList,
  selectedSong,
  loading,
  onClickFavourite,
}) => {
  const tableRef = useRef();

  const msg = (element) => (
    <div className="d-flex justify-content-center align-items-center">
      {element}
    </div>
  );

  return (
    <div className="contaner-list">
      <div className="d-flex justify-content-center table-container">
        {loading ? (
          <>
            {msg(
              <div className="spinner-table-loading">
                <SpinnerLoading />
              </div>
            )}
          </>
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
                {songsFavList
                  ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((s, index) => {
                    return (
                      <TableRow
                        onDoubleClick={() =>
                          onSelectSong(s?._id, "favouriteList")
                        }
                        key={s?._id}
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
                          <i
                            onClick={() => onClickFavourite(s?._id, true)}
                            className="fa-solid fa-heart fav-icon-fav"
                          ></i>
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
          {songsFavList?.length
            ? `${songsFavList?.length} canciones encontradas`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default FavouriteList;
