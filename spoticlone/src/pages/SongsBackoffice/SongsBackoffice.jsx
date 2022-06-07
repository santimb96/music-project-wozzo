import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  createSong,
  getSongs,
  removeSong,
  updateSong,
} from "../../services/songs.js";

import { getArtists } from "../../services/artists.js";
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
import CreateButton from "../../components/CreateButton/CreateButton";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import EditButton from "../../components/EditButton/EditButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import SnackBarSuccess from "../../components/SnackBarSuccess/SnackBarSuccess";
import SnackBarError from "../../components/SnackBarError/SnackBarError";
import CloseIcon from "@mui/icons-material/Close";
import sortItems from "../../utils/sortItems";
import { getGenres } from "../../services/genres";

const SongsBackoffice = () => {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [artistName, setArtistName] = useState("Selecciona");
  const [genreName, setGenreName] = useState("Selecciona");
  const [artistId, setArtistId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [audioUrl, setAudioUrl] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterDropdownArtists, setFilterDropdownArtists] = useState("");
  const [filterDropdownGenres, setFilterDropdownGenres] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
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
   * DELETE MODAL
   */
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (userId) => {
    setOpenDelete(true);
    setId(userId);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  /**
   * FORM MODAL TODO
   */
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = (post = false) => {
    if (post) {
      setCreate(true);
      setErrors(false);
      setOpenForm(true);
    } else {
      setErrors(false);
      setOpenForm(true);
    }
  };

  const handleCloseForm = () => {
    clearData();
    setErrors(false);
    setCreate(false);
    setOpenForm(false);
  };

  const getData = () => {
    Promise.all([getSongs(), getArtists(), getGenres()])
      .then(([songsResponse, artistsResponse, genresResponse]) => {

        setArtists(artistsResponse.artists);
        setGenres(genresResponse.genres);

        const data = songsResponse.songs.map((song) => {
          const artist = artistsResponse.artists.find(
            (artist) => artist._id === song.artistId
          );

          const genre = genresResponse.genres.find(genre => genre?._id === song?.genreId);
          return {
            ...song,
            artistName: artist.name,
            genreName: genre?.name || "no genre yet",
          };
        });
        setSongs(data);
      })
      .catch(() => setErrorOpen(true));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = songs?.filter((song) => {
      if (
        song.name
          .toLowerCase()
          .includes(text.toLowerCase().trim()) ||
        song.artistName
          .toLowerCase()
          .includes(text.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredSongs(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return sortItems(filteredSongs ? filteredSongs : songs);
    }
    return sortItems(songs ? songs : []);
  };

  const validateData = (method = false) => {
    if (method && artistName !== "Selecciona" && genreName !== "Selecciona") {
      return true;
    } else {
      if (
        name?.length &&
        artistId?.length &&
        artistName !== "Selecciona" && 
        genreName !== "Selecciona"
      ) {
        return true;
      }
      return false;
    }
  };

  const setData = (song) => {
    setId(song._id);
    setName(song.name);
    setArtistName(song.artistName);
    setGenreName(song.genreName);
    setArtistId(song.artistId);
    setGenreId(song.genreId);
    setAudioUrl(song.audioUrl);
    handleOpenForm();
  };

  const postSong = () => {
    if (validateData()) {
      setErrors(false);
      setLoading(true);
      createSong(name, artistId, genreId, audioUrl, token)
        .then(() => {
          setSuccessOpen(true);
          setLoading(false);
          setOpenForm(false);
          clearData();
          getData();
        })
        .catch(() => setErrorOpen(true));
    } else {
      setErrors(true);
    }
  };

  const deleteItem = (id) => {
    setLoading(true);
    removeSong(id)
      .then(() => {
        getData();
        setOpenDelete(false);
        setSuccessOpen(true);
        setLoading(false);
      })
      .catch(() => setErrorOpen(true));
  };

  const editSong = (method) => {
    if (validateData(method)) {
      setLoading(true);
      
      updateSong(id, name, artistId, genreId, audioUrl, token)
        .then(() => {
          setOpenForm(false);
          setLoading(false);
          setSuccessOpen(true);
          clearData();
          getData();
        })
        .catch(() => setErrorOpen(true));
    } else {
      setErrors(false);
    }
  };

  const clearData = () => {
    setName("");
    setArtistName("Selecciona");
    setGenreName("Selecciona");
    setAudioUrl("");
    setId("");
    setFilterDropdownArtists("");
  };

  useEffect(() => {
    const filtered = artists?.filter((artist) => {
      if (
        artist?.name
          .toLowerCase()
          .includes(filterDropdownArtists.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredArtists(filtered);
  }, [filterDropdownArtists]);

  
  useEffect(() => {
    const filtered = genres?.filter((genre) => {
      if (
        genre?.name
          .toLowerCase()
          .includes(filterDropdownGenres.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredGenres(filtered);
  }, [filterDropdownGenres]);

  const genresToShow = () => {
    if (filterDropdownGenres?.length) {
      return filteredGenres ? filteredGenres : genres;
    }
    return genres;
  };

  const artistsToShow = () => {
    if (filterDropdownArtists?.length) {
      return sortItems(filteredArtists ? filteredArtists : artists);
    }
    return sortItems(artists ? artists : []);
  };

  return (
    <div className="row">
      {!loading? <Sidebar/> : <div className="col-12 col-md-2 bg-dark"></div> }
      <div className="backoffice-container">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
          <input type="search" class="input-search-home" placeholder="Cancion o artista" disabled={loading} onChange={(e) => setText(e.target.value)} ></input>
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
                aria-label="sticky table"
                className="table-content"
                id="table"
                sx={{ height: "max-content" }}
              >
                <TableHead className="sticky-header">
                  <ModalDelete
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    loading={loading}
                    deleteItem={deleteItem}
                    id={id}
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
                        <button {...(loading ? { disabled: true } : {})} className="close-modal-button">
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <h2 className="d-flex justify-content-center pb-4">
                            {create ? "Crear canción" : "Actualizar canción"}
                          </h2>
                        </div>
                        <label className="label-form-modal" htmlFor="titulo">
                          Título de la canción*
                        </label>
                        <TextField
                          disabled={loading}
                          value={name}
                          type="text"
                          className="input"
                          id="titulo"
                          placeholder="Título"
                          onChange={(e) => setName(e.target.value)}
                          error={errors && name?.length === 0}
                          helperText={
                            errors && name?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        <label htmlFor="audioUrl">URL de la canción*</label>
                        <TextField
                        disabled={loading}
                          className="input"
                          type="file"
                          id="audioUrl"
                          variant="outlined"
                          placeholder="URL del audio"
                          onChange={(e) => setAudioUrl(e.target.files[0])}
                          error={errors && audioUrl?.length === 0}
                          helperText={
                            errors && audioUrl?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        {/* ARTIST DROPDOWN */}
                        <label htmlFor="drop">Compositor*</label>
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
                            {artistName}
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
                                setFilterDropdownArtists(e.target.value)
                              }
                            />

                            {artistsToShow()?.map((artist) => (
                              <button
                                {...(loading ? { disabled: true } : {})}
                                key={artist.name}
                                value={artist._id}
                                onClick={(e) => {
                                  setArtistId(e.target.value);
                                  setArtistName(artist.name);
                                }}
                                className="dropdown-item"
                                type="button"
                              >
                                {artist.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* GENRE DROPDOWN */}

                        <label htmlFor="drop">Género*</label>
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
                            {genreName}
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
                                setFilterDropdownGenres(e.target.value)
                              }
                            />

                            {genresToShow()?.map((genre) => (
                              <button
                                {...(loading ? { disabled: true } : {})}
                                key={genre.name}
                                value={genre._id}
                                onClick={(e) => {
                                  setGenreId(e.target.value);
                                  setGenreName(genre.name);
                                }}
                                className="dropdown-item"
                                type="button"
                              >
                                {genre.name}
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
                                onClick={() => postSong()}
                                className="btn-modal-form"
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                              disabled={loading}
                                onClick={() => editSong(true)}
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
                      Título
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Artista
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Género
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      URL de la canción
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
                  {itemsToShow()?.map((song) => (
                    <TableRow
                      key={song.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {song.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {song.artistName}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {song.genreName}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {song.audioUrl}
                      </TableCell>
                      <EditButton setData={setData} item={song} loading={loading} />
                      <DeleteButton
                        handleOpenDelete={handleOpenDelete}
                        id={song._id}
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

export default SongsBackoffice;
