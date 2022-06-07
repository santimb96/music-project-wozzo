import { BASE_URI_ARTIST } from "../urls/urls";
import { deleteItem, get, post, put } from "../utils/apiWrapper";

const getArtists = async () => await get(BASE_URI_ARTIST);

const deleteArtist = async (id) => await deleteItem(`${BASE_URI_ARTIST}/${id}`);

const postArtist = async (artist) => await post(`${BASE_URI_ARTIST}`, artist);

const updateArtist = async (id, artist) => await put(`${BASE_URI_ARTIST}/${id}`, artist);

export { getArtists, deleteArtist, postArtist, updateArtist };
