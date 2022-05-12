import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  getArtists,
  deleteArtist,
  postArtist,
  updateArtist,
} from "../../services/artists";
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
import sortItems from "../../utils/sortItems";

const ArtistsBackoffice = () => {
  const token = localStorage.getItem("token");
  const [artists, setArtists] = useState(null);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [id, setId] = useState("");
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
    setName("");
    setDescription("");
    setProfileImage("");
    setId("");
  };

  const getData = () => {
    getArtists(token)
      .then((artist) => {
        setArtists(artist?.artists);
      })
      .catch(() => setErrorOpen(true));
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
      return sortItems(filteredArtists ? filteredArtists : artists);
    }
    return sortItems(artists ? artists : []);
  };

  const validateData = () => {
    if (name?.length && description?.length && profileImage?.length) {
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
      setErrors(false);
      setLoading(true);
      postArtist(artist, token)
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

    }
  };

  const deleteItem = (id) => {
    setLoading(true);
    deleteArtist(id, token)
      .then(() => {
        getData();
        setOpenDelete(false);
        setSuccessOpen(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorOpen(true);
      });
  };

  const editArtist = () => {
    if (validateData()) {
      const artist = {
        name,
        description,
        profileImage,
      };
      setErrors(false);
      setLoading(true);
      updateArtist(id, artist, token)
        .then(() => {
          setOpenForm(false);
          setSuccessOpen(true);
          setLoading(false);
          getData();
        })
        .catch(() => {
          setLoading(false);
          setErrorOpen(true);
        });
    } else {
      setLoading(false);
      setErrors(true);

    }
  };
  return (
    <div className="row">
      {!loading ? (
        <Sidebar />
      ) : (
        <div className="col-12 col-md-2 bg-dark"></div>
      )}
      <div className="backoffice-container">
        <Box sx={{ bgcolor: theme.palette.primary.main, height: "100vh" }}>
          <div className="table-head-item d-flex justify-content-around align-items-center">
          <input type="search" class="input-search-home" placeholder="Nombre del artista" disabled={loading} onChange={(e) => setText(e.target.value)} ></input>
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
                      <div>
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
                            {create ? "Crear artista" : "Actualizar artista"}
                          </h2>
                        </div>
                        <label htmlFor="name">Nombre*</label>
                        <TextField
                          disabled={loading}
                          value={name}
                          type="text"
                          className="input"
                          id="name"
                          placeholder="nombre"
                          onChange={(e) => setName(e.target.value)}
                          error={errors && name?.length === 0}
                          helperText={
                            errors && name?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        <label htmlFor="description">Descripción*</label>
                        <TextField
                          disabled={loading}
                          className="input"
                          minRows={2}
                          multiline
                          type="text"
                          value={description}
                          placeholder="descripción"
                          id="description"
                          onChange={(e) => setDescription(e.target.value)}
                          error={errors && description?.length === 0}
                          helperText={
                            errors && description?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                        <label htmlFor="image">Imagen del cantante*</label>
                        <TextField
                          disabled={loading}
                          className="input"
                          type="text"
                          value={profileImage}
                          id="image"
                          variant="outlined"
                          placeholder="imagen"
                          onChange={(e) => setProfileImage(e.target.value)}
                          error={errors && profileImage?.length === 0}
                          helperText={
                            errors && profileImage?.length === 0
                              ? EMPTY_FIELD_MESSAGE
                              : " "
                          }
                        />
                      </div>
                      
                      {!loading ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                onClick={() => createArtist()}
                                className="btn-modal-form"
                                disabled={loading}
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                                onClick={() => editArtist(true)}
                                className="btn-modal-form"
                                disabled={loading}
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
                      </div>
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
                      >
                        {artist.profileImage}
                      </TableCell>

                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {artist.name}
                      </TableCell>

                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {artist.description}
                      </TableCell>
                      <EditButton
                        setData={setData}
                        item={artist}
                        loading={loading}
                      />
                      <DeleteButton
                        handleOpenDelete={handleOpenDelete}
                        id={artist._id}
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

export default ArtistsBackoffice;