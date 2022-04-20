import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import {
  createSong,
  getSongs,
  removeSong,
  updateSong,
  getArtistBySongId,
} from "../services/songs.js";

import { getArtists } from "../services/artists.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { InputBase } from "@mui/material";
import Container from "@mui/material/Container";
import theme from "../palette/palette";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SpinnerLoading from "../components/common/SpinnerLoading";
import { pink } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

const SongBackoffice = () => {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [artistName, setArtistName] = useState("Selecciona");
  const [artistId, setArtistId] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [id, setId] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [responseStatus, setResponseStatus] = useState(true);
  const [create, setCreate] = useState(false);
  const [artists, setArtists] = useState([]);

  /**
   *
   * OPEN SIDEBAR
   */

  const handleOpenSidebar = () => {
    if (openSidebar) {
      document.getElementById("sidebar").style.display = "none";
      setOpenSidebar(false);
    } else {
      document.getElementById("sidebar").style.display = "grid";
      document.getElementById("sidebar").style.width = "100%";
      setOpenSidebar(true);
    }
  };
  /**
   * ERROR MODAL
   */
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setTimeout(() => setOpenError(false), 1500);
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
      setOpenForm(true);
    } else {
      setOpenForm(true);
    }
  };

  const handleCloseForm = () => {
    clearData();
    setCreate(false);
    setOpenForm(false);
  };

  const getData = () => {
    Promise.all([getSongs(token), getArtists(token)]).then(([songsResponse, artistsResponse]) => {
      setArtists(artistsResponse.artists);
      const data = songsResponse.songs.map(song => {
        const artist = artistsResponse.artists.find(artist => artist._id === song.artistId);
        //setArtists((prevState) => [...prevState, artist]);
        return {
          ...song,
          artistName: artist.name,
        };
      })
      setSongs(data);
      console.log(data);
    }).catch(err => console.warn(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = songs?.filter((song) => {
      if (
        song.name.toLocaleLowerCase().includes(text.toLocaleLowerCase().trim()) || song.artistName.toLocaleLowerCase().includes(text.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });


    setFilteredSongs(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredSongs;
    }
    return songs;
  };

  const validateData = (method = false) => {
    if (method && artistName !== "Selecciona") {
      return true;
    } else {
      if (name?.length && artistId?.length && audioUrl?.length && artistName !== "Selecciona") {
        return true;
      }
      return false;
    }
  };

  const setData = (song) => {
    setId(song._id);
    setName(song.name);
    setArtistName(song.artistName);
    setAudioUrl(song.audioUrl);
    handleOpenForm();
  };

  const postSong = () => {
    if (validateData()) {
      setResponseStatus(false);
      createSong(name, artistId, audioUrl, token)
        .then((song) => {
          console.log(song);
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.error(err));
    } else {
      handleOpenError();
      handleCloseError();
    }
  };

  const deleteSong = (id) => {
    setResponseStatus(false);
    removeSong(id, token)
      .then((song) => {
        getData();
        setOpenDelete(false);
        setResponseStatus(true);
      })
      .catch((err) => console.error(err));
  };

  const editSong = (method) => {
    if (validateData(method)) {
      setResponseStatus(false);
      const newSong = {
        name,
        artistId,
        audioUrl,
      };
      updateSong(id, newSong, token)
        .then((song) => {
          console.log(song);
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.warn(err));
    } else {
      handleOpenError();
      handleCloseError();
    }
  };

  const clearData = () => {
    setName("");
    setArtistName("Selecciona");
    setAudioUrl("");
    setId("");
  };

  const filteredArtists = () => {
    const seen = new Set();
    const filtered = artists.filter(artist => {
      const duplicate = seen.has(artist._id);
      seen.add(artist._id);
      return !duplicate;
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="row">
      <SidebarBackoffice />
      <div className="col-12 col-md-10 p-0">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item">
            <button
              onClick={() => handleOpenSidebar()}
              className="btn hamburguer-button"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              className="btn-open-form"
              onClick={() => handleOpenForm(true)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Button>
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
                  <Modal
                    open={openError}
                    onClose={handleCloseError}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        ¡Error de validación de los campos!
                      </Typography>
                    </Box>
                  </Modal>

                  <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    {responseStatus ? (
                      <Box className="modal-delete">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          ¿Estás seguro de que quieres borrarlo?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            <Button
                              onClick={() => deleteSong(id)}
                              className="btn-modal btn-delete"
                            >
                              Sí
                            </Button>{" "}
                            <Button
                              className="btn-modal "
                              onClick={handleCloseDelete}
                            >
                              No
                            </Button>
                          </div>
                        </Typography>
                      </Box>
                    ) : (
                      <Box className="modal-delete">
                        <SpinnerLoading />
                      </Box>
                    )}
                  </Modal>

                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <div>
                        <TextField
                          value={name}
                          type="text"
                          className="input"
                          id="outlined-basic"
                          placeholder="nombre"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                          className="input"
                          type="text"
                          value={audioUrl}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="audio path"
                          onChange={(e) => setAudioUrl(e.target.value)}
                        />
                        <div class="dropdown d-flex justify-content-center">
                          <button
                            className="btn btn-dropdown dropdown-toggle"
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {artistName}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-left  scrollable-menu"
                            aria-labelledby="dropdownMenu2"
                          >
                            {filteredArtists()?.map((artist) => (
                              <button
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
                      </div>
                      {responseStatus ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                onClick={() => postSong()}
                                className="btn-modal-form"
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                                onClick={() => editSong(true)}
                                className="btn-modal-form"
                              >
                                Actualizar
                              </Button>
                            )}
                          </div>
                        </Typography>
                      ) : (
                        <Typography className="d-flex justify-content-center ">
                          <SpinnerLoading />
                        </Typography>
                      )}
                    </Box>
                  </Modal>

                  <TableRow>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Nombre
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
                      Path
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Borrar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                        onClick={() => setData(song)}
                      >
                        {song.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(song)}
                      >
                        {song.artistName}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(song)}
                      >
                        {song.audioUrl}
                      </TableCell>
                      <TableCell
                        sx={{ color: pink[600] }}
                        align="left"
                        onClick={() => handleOpenDelete(song._id)}
                      >
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default SongBackoffice;
