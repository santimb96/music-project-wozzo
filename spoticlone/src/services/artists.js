import { BASE_URI_ARTIST } from "../urls/urls";

const getArtists = () =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_ARTIST}`)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

const getArtistsById = (id, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_ARTIST}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

const deleteArtist = (id, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_ARTIST}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

const postArtist = (artist, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_ARTIST}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

const updateArtist = (id, artist, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_ARTIST}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

export { getArtists, getArtistsById, deleteArtist, postArtist, updateArtist };
