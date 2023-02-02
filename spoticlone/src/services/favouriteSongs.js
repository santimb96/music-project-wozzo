import { BASE_URI_FAVOURITE_SONGS } from "../urls/urls";
import { deleteItem, get, getById, post, put } from "../utils/apiWrapper";

const getFavSongs = async () => await get(BASE_URI_FAVOURITE_SONGS);

const getUserFavSongs = async(userId) => await getById(BASE_URI_FAVOURITE_SONGS, userId);
  
const deleteFavSong = async(id) => await deleteItem(`${BASE_URI_FAVOURITE_SONGS}/${id}`);

const postFavSong = async (favouriteSong) => await post(`${BASE_URI_FAVOURITE_SONGS}`, favouriteSong);

const updatefavSong = async (id, favouriteSong) => await put(`${BASE_URI_FAVOURITE_SONGS}/${id}`, favouriteSong);

export {
  getFavSongs,
  getUserFavSongs,
  deleteFavSong,
  postFavSong,
  updatefavSong,
};
