import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { getArtists, deleteArtist, getArtistsById, postArtist, updateArtist } from "../services/artists";
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
import ROLES from "../utils/roleId";
import TextField from "@mui/material/TextField";
import TextTareaAutosize  from "@mui/material/TextareaAutosize";

const ArtistBackoffice = () => {
  const token = localStorage.getItem("token");
  const [artists, setArtists] = useState(null);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [id, setId] = useState("");
  const [openError, setOpenError] = useState(false);

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
    setId(artistId);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  /**
   * FORM MODAL TODO
   */
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);

  const handleCloseForm = () => {
    setName("");
    setDescription("");
    setProfileImage("");
    setId("");

    setOpenForm(false);
  };

  const getData = () => {
    getArtists(token)
      .then((artist) => {
        console.log(artist);
        setArtists(artist?.artists);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = artists?.filter((artist) => {
      if (
        artist.name
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setFilteredArtists(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredArtists;
    }
    return artists;
  };

  const validateData = () => {
    if (
      name?.length &&
      description?.length &&
      profileImage?.length
    ) {
      return true;
    }
    return false;
  };

  const setData = (artist) => {
    setId(artist._id);
    setName(artist.name);
    setDescription(artist.description);
    setProfileImage(artist.profileImage);
    handleOpenForm();
  };

  const createArtist = () => {
    if (validateData()) {

      const artist = {
        name,
        description,
        profileImage,
      };

      postArtist(artist, token)
        .then((artist) => {
          console.log(artist);
          setOpenForm(false);
          getData();
        })
        .catch((err) => console.error(err));
    } else {
      handleOpenError();
      handleCloseError();
    }
  };

  const removeArtist = (id) => {
    deleteArtist(id, token)
      .then((artist) => {
        getData();
        setOpenDelete(false);
      })
      .catch((err) => console.error(err));
  };

  const editArtist = () => {
    if(validateData()){
    const artist = {
      name,
      description,
      profileImage
    };

    updateArtist(id, artist, token)
      .then((artist) => {
        console.log(artist);
        setOpenForm(false);
        getData();
      })
      .catch((err) => console.warn(err));
    } else {
      handleOpenError();
      handleCloseError();
    }
  };
  return (
    <Grid container spacing={{ xs: 0 }}>
      <SidebarBackoffice />
      <Grid item xs={10} className="bg-success">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item">
            <TextField
              className="input"
              placeholder="busca..."
              onChange={(e) => setText(e.target.value)}
            />
            <Button className="btn-open-form" onClick={handleOpenForm}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Button>
          </div>

          <TableContainer component={Paper} className="table-content" sx={{height: '80%'}}>
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
                            onClick={() => removeArtist(id)}
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
                        <div className="text-tarea">
                        <TextTareaAutosize
                          type="text"
                          value={description}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="descripcion"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        </div>
                        <TextField
                          className="input"
                          type="text"
                          value={profileImage}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="imagen"
                          onChange={(e) => setProfileImage(e.target.value)}
                        />
                      </div>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="typo-flex">
                          <Button
                            onClick={() => createArtist()}
                            className="btn-modal-form"
                          >
                            Crear
                          </Button>{" "}
                          <Button
                            onClick={() => editArtist()}
                            className="btn-modal-form"
                          >
                            Actualizar
                          </Button>
                        </div>
                      </Typography>
                    </Box>
                  </Modal>

                  <TableRow>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Perfil
                    </TableCell>
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
                     Descripción 
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
                  {itemsToShow()?.map((artist) => (
                    <TableRow
                      key={artist.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(artist)}
                      >
                        {artist.profileImage}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(artist)}
                      >
                        {artist.name}
                      </TableCell>
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                        onClick={() => setData(artist)}
                      >
                        {artist.description}
                      </TableCell>
                      <TableCell
                        sx={{ color: pink[600] }}
                        align="left"
                        onClick={() => handleOpenDelete(artist._id)}
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
      </Grid>
    </Grid>
  );
};

export default ArtistBackoffice;
