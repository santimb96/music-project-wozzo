import { get, post, put, deleteItem } from "../utils/apiWrapper";
import { BASE_URI_GENRES } from "../urls/urls";

const getGenres = () => get(`${BASE_URI_GENRES}`);

const postGenre = (name) => post(`${BASE_URI_GENRES}`, {name});

const updateGenre = (id, name) => put(`${BASE_URI_GENRES}/${id}`, {name});

const deleteGenre = (id) => deleteItem(`${BASE_URI_GENRES}/${id}`);

export {
  getGenres,
  postGenre,
  updateGenre,
  deleteGenre
};