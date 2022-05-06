import { BASE_URI_FAVOURITE_SONGS } from "../urls/urls";

const getFavSong = () =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_FAVOURITE_SONGS}`)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });


const deleteFavSong = (id, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_FAVOURITE_SONGS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

const postFavSong = (favouriteSong, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_FAVOURITE_SONGS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(favouriteSong),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
  const updatefavSong = (id, favouriteSong, token) =>
  new Promise((resolve, reject) => {
    fetch(`${BASE_URI_FAVOURITE_SONGS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(favouriteSong),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

export { getFavSong, deleteFavSong, postFavSong, updatefavSong };
