import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../../components/SidebarBackoffice/SidebarBackoffice";
import { getSongs } from "../../services/songs";
import { getUsers } from "../../services/user";
import Box from "@mui/material/Box";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import theme from "../../palette/palette";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE } from "../../constants";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import CreateButton from "../../components/CreateButton/CreateButton";
import EditButton from "../../components/EditButton/EditButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import SnackBarSuccess from "../../components/SnackBarSuccess/SnackBarSuccess";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss";
import {
  deleteFavSong,
  getFavSong,
  postFavSong,
  updatefavSong,
} from "../../services/favouriteSongs";

const FavouriteSongBackoffice = () => {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const [favouriteSongs, setFavouriteSongs] = useState(null);
  const [users, setUsers] = useState([]);

  const [userName, setUserName] = useState("Selecciona");
  const [songName, setSongName] = useState("Selecciona");

  const [filteredFavSongs, setFilteredFavSongs] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const [text, setText] = useState("");
  const [filterUserDropdown, setFilterUserDropdown] = useState("");
  const [filterSongDropdown, setFilterSongDropdown] = useState("");

  const [favouriteSongId, setFavouriteSongId] = useState("");
  const [userId, setUserId] = useState("");
  const [songId, setSongId] = useState("");

  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [errors, setErrors] = useState(false);
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

  /**
   * ERROR MODAL
   */
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setTimeout(() => setOpenError(false), 1500);
  /**
   * DELETE MODAL
   */
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (artistId) => {
    setOpenDelete(true);
    setFavouriteSongId(artistId);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  /**
   * FORM MODAL TODO
   */
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = (post = false) => {
    setCreate(post);
    setErrors(false);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    clearData();
    setErrors(false);
    setCreate(false);
    setOpenForm(false);
  };

  const clearData = () => {
    setFavouriteSongId("");
    setSongId("");
    setUserId("");
    setUserName("Selecciona");
    setSongName("Selecciona");
    setFavouriteSongId("");
  };

  const getData = () => {
    Promise.all([getSongs(), getUsers(token), getFavSong()])
      .then(([songsResponse, usersResponse, favouriteSongsResponse]) => {
        setUsers(usersResponse.users);
        setSongs(songsResponse.songs);
        const data = favouriteSongsResponse.favouriteSong.map((favSong) => {
          const user = usersResponse.users.find(
            (user) => user._id === favSong.userId
          );
          const song = songsResponse.songs.find(
            (song) => song._id === favSong.songId
          );
          return {
            ...favSong,
            userName: user.name,
            songName: song.name,
          };
        });
        setFavouriteSongs(data);
      })
      .catch(() => setErrorOpen(true));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = favouriteSongs?.filter((favouriteSong) => {
      if (
        favouriteSong.userName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim()) ||
        favouriteSong.songName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredFavSongs(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredFavSongs;
    }
    return favouriteSongs;
  };

  const validateData = () => {
    const checkUser = users.find((user) => user._id === userId);
    const checkSong = songs.find((song) => song._id === songId);

    return checkUser && checkSong ? true : false;
  };

  const setData = (favouriteSong) => {
    setFavouriteSongId(favouriteSong._id);
    setUserName(favouriteSong.userName);
    setSongName(favouriteSong.songName);
    setUserId(favouriteSong.userId);
    setSongId(favouriteSong.songId);
    handleOpenForm();
  };

  const createFavSong = () => {
    if (validateData()) {
      const createFavSong = {
        userId,
        songId,
      };
      setErrors(false);
      setLoading(true);
      postFavSong(createFavSong, token)
        .then(() => {
          setOpenForm(false);
          setLoading(false);
          setSuccessOpen(true);
          getData();
        })
        .catch(() => setErrorOpen(true));
    } else {
      setLoading(false);
      setErrors(true);
      handleOpenError();
      handleCloseError();
    }
  };

  const deleteItem = (id) => {
    setLoading(true);
    deleteFavSong(id, token)
      .then(() => {
        getData();
        setOpenDelete(false);
        setSuccessOpen(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorOpen(true);
      });
  };

  const editFavSong = () => {
    if (validateData()) {
      const updatedfavSong = {
        songId,
      };
      setErrors(false);
      setLoading(true);
      updatefavSong(favouriteSongId, updatedfavSong, token)
        .then(() => {
          setOpenForm(false);
          setSuccessOpen(true);
          setLoading(false);
          getData();
        })
        .catch((err) => {
          setLoading(false);
          setErrorOpen(true);
        });
    } else {
      setLoading(false);
      setErrors(true);
      handleOpenError();
      handleCloseError();
    }
  };

  const duplicateUsers = () => {
    const seen = new Set();
    const filtered = users.filter((user) => {
      const duplicate = seen.has(user._id);
      seen.add(user._id);
      return !duplicate;
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    const filtered = duplicateUsers()?.filter((user) => {
      if (
        user.name
          .toLocaleLowerCase()
          .includes(filterUserDropdown.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredUsers(filtered);
  }, [filterUserDropdown]);

  const duplicateSongs = () => {
    const seen = new Set();
    const filtered = songs.filter((song) => {
      const duplicate = seen.has(song._id);
      seen.add(song._id);
      return !duplicate;
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    const filtered = duplicateSongs()?.filter((song) => {
      if (
        song.name
          .toLocaleLowerCase()
          .includes(filterSongDropdown.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredSongs(filtered);
  }, [filterSongDropdown]);

  const usersToShow = () => {
    if (filterUserDropdown?.length) {
      return filteredUsers;
    }
    return duplicateUsers();
  };

  const songsToShow = () => {
    if (filterSongDropdown?.length) {
      return filteredSongs;
    }
    return duplicateSongs();
  };

  return (
    <div className="row">
      {!loading ? (
        <SidebarBackoffice />
      ) : (
        <div className="col-12 col-md-2 bg-dark"></div>
      )}
      <div className="col-12 col-md-10 p-0">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <CreateButton handleOpenForm={handleOpenForm} loading={loading} />
          </div>

          <TableContainer
            component={Paper}
            className="table-content"
            sx={{ height: "80%" }}
          >
            {!itemsToShow() ? (
              <div className="spinner-table-loading">
                <SpinnerLoading />
              </div>
            ) : (
              <Table
                size="medium"
                aria-label="a dense table"
                className="table-content"
                sx={{ height: "max-content" }}
              >
                <TableHead>
                  <ModalDelete
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    loading={loading}
                    deleteItem={deleteItem}
                    id={favouriteSongId}
                  />

                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <div
                        onClick={handleCloseForm}
                        className="d-flex justify-content-end"
                      >
                        <button
                          {...(loading ? { disabled: true } : {})}
                          className="close-modal-button"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <h2 className="d-flex justify-content-center pb-4">
                            {create ? "Crear favorito" : "Actualizar favorito"}
                          </h2>
                        </div>
                        {/* USER INFO */}
                        {!create ? (
                          <>
                            <label htmlFor="user">Usuario*</label>
                            <div
                              id="user"
                              className="d-flex justify-content-center text-light"
                            >
                              <h5>{userName}</h5>
                            </div>
                          </>
                        ) : (
                          <>
                            <label htmlFor="drop">Usuario*</label>
                            <div className="dropdown d-flex justify-content-center">
                              <button
                                {...(loading ? { disabled: true } : {})}
                                className="btn btn-dropdown dropdown-toggle"
                                type="button"
                                id="drop"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {userName}
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-left  scrollable-menu"
                                aria-labelledby="drop"
                              >
                                <input
                                  {...(loading ? { disabled: true } : {})}
                                  type="text"
                                  placeholder="Filtrar..."
                                  className="search-filter-dropdown"
                                  onChange={(e) =>
                                    setFilterUserDropdown(e.target.value)
                                  }
                                />

                                {usersToShow()?.map((user) => (
                                  <button
                                    {...(loading ? { disabled: true } : {})}
                                    key={user.name}
                                    value={user._id}
                                    onClick={(e) => {
                                      setUserId(e.target.value);
                                      setUserName(user.name);
                                    }}
                                    className="dropdown-item"
                                    type="button"
                                  >
                                    {user.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* SONG DROPDOWN */}
                        <label htmlFor="drop">Canción*</label>
                        <div className="dropdown d-flex justify-content-center">
                          <button
                            {...(loading ? { disabled: true } : {})}
                            className="btn btn-dropdown dropdown-toggle"
                            type="button"
                            id="drop"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {songName}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-left  scrollable-menu"
                            aria-labelledby="drop"
                          >
                            <input
                              {...(loading ? { disabled: true } : {})}
                              type="text"
                              placeholder="Filtrar..."
                              className="search-filter-dropdown"
                              onChange={(e) =>
                                setFilterSongDropdown(e.target.value)
                              }
                            />

                            {songsToShow()?.map((song) => (
                              <button
                                {...(loading ? { disabled: true } : {})}
                                key={song.name}
                                value={song._id}
                                onClick={(e) => {
                                  setSongId(e.target.value);
                                  setSongName(song.name);
                                }}
                                className="dropdown-item"
                                type="button"
                              >
                                {song.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {!loading ? (
                        <div id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                disabled={loading}
                                onClick={() => createFavSong()}
                                className="btn-modal-form"
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                                disabled={loading}
                                onClick={() => editFavSong(true)}
                                className="btn-modal-form"
                              >
                                Actualizar
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Typography className="d-flex justify-content-center ">
                          <SpinnerLoading />
                        </Typography>
                      )}
                      <small>*Campos requeridos</small>
                    </Box>
                  </Modal>

                  <TableRow>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Usuario
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Canción
                    </TableCell>

                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Editar
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Borrar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pointer-table">
                  {itemsToShow()?.map((favouriteSong) => (
                    <TableRow
                      key={favouriteSong._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {favouriteSong.userName}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {favouriteSong.songName}
                      </TableCell>

                      <EditButton
                        setData={setData}
                        item={favouriteSong}
                        loading={loading}
                      />
                      <DeleteButton
                        handleOpenDelete={handleOpenDelete}
                        id={favouriteSong._id}
                        loading={loading}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
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

export default FavouriteSongBackoffice;
