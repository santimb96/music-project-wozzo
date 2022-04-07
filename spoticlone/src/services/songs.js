import { BASE_URI_SONG } from "../urls/urls";

const getSongs = () => new Promise((resolve, reject) => {
  fetch(BASE_URI_SONG)
    .then(res => resolve(res.json()))
    .catch(err => reject(err))
});

export {
  getSongs
}