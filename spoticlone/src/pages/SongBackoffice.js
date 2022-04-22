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
import { pink, yellow } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { EMPTY_FIELD_MESSAGE } from "../constants";
import EditIcon from '@mui/icons-material/Edit';
import ButtonCreate from "../components/common/ButtonCreate";
import ModalDelete from "../components/common/ModalDelete";
import EditButton from "../components/common/EditButton";
import DeleteButton from "../components/common/DeleteButton";
import { checkUrl } from "../utils/validators";

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
  const [responseStatus, setResponseStatus] = useState(true);
  const [create, setCreate] = useState(false);
  const [artists, setArtists] = useState([]);
  const [filterDropdown, setFilterDropdown] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [errors, setErrors] = useState(false);

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
    Promise.all([getSongs(token), getArtists(token)]).then(([songsResponse, artistsResponse]) => {
      setArtists(artistsResponse.artists);
      const data = songsResponse.songs.map(song => {
        const artist = artistsResponse.artists.find(artist => artist._id === song.artistId);
        return {
          ...song,
          artistName: artist.name,
        };
      })
      setSongs(data);
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

    if (method && artistName !== "Selecciona" && checkUrl(audioUrl)) {
      return true;
    } else {
      if (name?.length && artistId?.length && checkUrl(audioUrl) && artistName !== "Selecciona") {
        return true;
      }
      return false;
    }
  };

  const setData = (song) => {
    setId(song._id);
    setName(song.name);
    setArtistName(song.artistName);
    setArtistId(song.artistId);
    setAudioUrl(song.audioUrl);
    handleOpenForm();
  };

  const postSong = () => {
    if (validateData()) {
      setErrors(false);
      setResponseStatus(false);
      createSong(name, artistId, audioUrl, token)
        .then(() => {
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.error(err));
    } else {
      setErrors(true);
      handleOpenError();
      handleCloseError();
    }
  };

  const deleteItem = (id) => {
    setResponseStatus(false);
    removeSong(id, token)
      .then(() => {
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
        .then(() => {
          setOpenForm(false);
          setResponseStatus(true);
          clearData();
          getData();
        })
        .catch((err) => console.warn(err));
    } else {
      setErrors(false);
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

  const duplicateArtists = () => {
    const seen = new Set();
    const filtered = artists.filter(artist => {
      const duplicate = seen.has(artist._id);
      seen.add(artist._id);
      return !duplicate;
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  useEffect(() => {
    const filtered = duplicateArtists()?.filter((artist) => {
      if (
        artist.name.toLocaleLowerCase().includes(filterDropdown.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredArtists(filtered);
  }, [filterDropdown])

  const artistsToShow = () => {
    if (filterDropdown?.length) {
      return filteredArtists;
    }
    return duplicateArtists();
  };

  return (
    <div className="row">
      <SidebarBackoffice />
      <div className="col-12 col-md-10 p-0">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
            <ButtonCreate handleOpenForm={handleOpenForm} />
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
                  <ModalDelete openDelete={openDelete} handleCloseDelete={handleCloseDelete} responseStatus={responseStatus} deleteItem={deleteItem} id={id} />
                 
                  <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                  >
                    <Box className="modal-delete">
                      <div>
                        <div>
                          <h2 className="d-flex justify-content-center pb-4">{create ? 'Crear canción': 'Actualizar canción'}</h2>
                        </div>
                        <label className="label-form-modal" htmlFor="titulo">Título de la canción*</label>
                        <TextField
                          value={name}
                          type="text"
                          className="input"
                          id="titulo"
                          placeholder="Título"
                          onChange={(e) => setName(e.target.value)}
                          error={errors && name?.length === 0}
                          helperText={errors && name?.length === 0 ? EMPTY_FIELD_MESSAGE : ' '}
                        />
                        <label htmlFor="audioUrl">URL de la canción*</label>
                        <TextField
                          className="input"
                          type="text"
                          value={audioUrl}
                          id="audioUrl"
                          variant="outlined"
                          placeholder="URL del audio"
                          onChange={(e) => setAudioUrl(e.target.value)}
                          
                          error={errors && audioUrl?.length === 0}
                          helperText={errors && audioUrl?.length === 0 ? EMPTY_FIELD_MESSAGE : ' '}
                        />
                        <label htmlFor="drop">Compositor*</label>
                        <div className="dropdown d-flex justify-content-center">
                          <button
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
                            <input type="text" placeholder="Filtrar..." className="search-filter-dropdown" onChange={(e) => setFilterDropdown(e.target.value)}/>

                            {artistsToShow()?.map((artist) => (
                              <button
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
                      <small>*Campos requeridos</small>
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
                        {song.audioUrl}
                      </TableCell>
                      <EditButton setData={setData} item={song} />
                      <DeleteButton handleOpenDelete={handleOpenDelete} id={song._id}/>
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
