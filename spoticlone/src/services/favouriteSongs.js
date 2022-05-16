import { BASE_URI_FAVOURITE_SONGS } from "../urls/urls";
import { deleteItem, get, getById, post, put } from "../utils/apiWrapper";

const getFavSongs = () => get(BASE_URI_FAVOURITE_SONGS);

const getUserFavSongs = (userId) => getById(BASE_URI_FAVOURITE_SONGS, userId);
  
const deleteFavSong = (id) => deleteItem(`${BASE_URI_FAVOURITE_SONGS}/${id}`);

const postFavSong = (favouriteSong) => post(BASE_URI_FAVOURITE_SONGS, favouriteSong);

const updatefavSong = (id, favouriteSong) => put(`${BASE_URI_FAVOURITE_SONGS}/${id}`, favouriteSong);

export {
  getFavSongs,
  getUserFavSongs,
  deleteFavSong,
  postFavSong,
  updatefavSong,
};
