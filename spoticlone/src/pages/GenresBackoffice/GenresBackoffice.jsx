import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getGenres, postGenre, deleteGenre, updateGenre } from "../../services/genres";
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

const GenresBackoffice = () => {
  const token = localStorage.getItem("token");
  const [genres, setGenres] = useState(null);
  const [filteredGenres, setfilteredGenres] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
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

  const handleOpenDelete = (genreId) => {
    setOpenDelete(true);
    setId(genreId);
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
    setId("");
  };

  const getData = () => {
    getGenres()
      .then((genre) => {
        setGenres(genre?.genres);
      })
      .catch(() => setErrorOpen(true));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = genres?.filter((genre) => {
      if (
        genre.name
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });
    setfilteredGenres(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return sortItems(filteredGenres ? filteredGenres : genres);
    }
    return sortItems(genres ? genres : []);
  };

  const validateData = () => {
    if (name?.length > 0) {
      return true;
    }
    return false;
  };

  const setData = (genre) => {
    setId(genre?._id);
    setName(genre?.name);
    handleOpenForm();
  };

  const createGenre = () => {
    if (validateData()) {
      setErrors(false);
      setLoading(true);
      postGenre(name)
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
    deleteGenre(id)
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

  const editGenre = () => {
    if (validateData()) {
      setErrors(false);
      setLoading(true);
      updateGenre(id, name)
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
          <input type="search" class="input-search-home" placeholder="Nombre del género" disabled={loading} onChange={(e) => setText(e.target.value)} ></input>
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
                            {create ? "Crear género" : "Actualizar género"}
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
                      </div>
                      
                      {!loading ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="typo-flex">
                            {create ? (
                              <Button
                                onClick={() => createGenre()}
                                className="btn-modal-form"
                                disabled={loading}
                              >
                                Crear
                              </Button>
                            ) : (
                              <Button
                                onClick={() => editGenre(true)}
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
                      ID
                    </TableCell>
                    <TableCell
                      style={{ color: theme.palette.secondary.mainLight }}
                      align="left"
                    >
                      Nombre del género
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
                  {itemsToShow()?.map((genre) => (
                    <TableRow
                      key={genre?.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {genre?._id}
                      </TableCell>

                      <TableCell
                        style={{ color: theme.palette.secondary.mainLight }}
                        align="left"
                      >
                        {genre.name}
                      </TableCell>
                      <EditButton
                        setData={setData}
                        item={genre}
                        loading={loading}
                      />
                      <DeleteButton
                        handleOpenDelete={handleOpenDelete}
                        id={genre._id}
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

export default GenresBackoffice;
