import { BASE_URI_ARTIST} from "../urls/urls";

const getArtists = () => new Promise((resolve, reject) => {
  fetch(`${BASE_URI_ARTIST}`)
    .then(res => resolve(res.json()))
    .catch(err => reject(err))
});

export {
  getArtists
}