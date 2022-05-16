import { BASE_URI_ARTIST } from "../urls/urls";
import { deleteItem, get, post, put } from "../utils/apiWrapper";

const getArtists = () => get(BASE_URI_ARTIST);

const deleteArtist = (id, token) => deleteItem(`${BASE_URI_ARTIST}/${id}`);

const postArtist = (artist) => post(`${BASE_URI_ARTIST}`, artist);

const updateArtist = (id, artist, token) => put(`${BASE_URI_ARTIST}/${id}`, artist);

export { getArtists, deleteArtist, postArtist, updateArtist };
