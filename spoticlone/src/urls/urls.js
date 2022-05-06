const BASE_URL = process.env.REACT_APP_REST_API_LOCATION;

const BASE_URI_USER = `${BASE_URL}/users`;
const BASE_URI_ARTIST = `${BASE_URL}/artists`;
const BASE_URI_SONG = `${BASE_URL}/songs`;
const BASE_URI_ROLES = `${BASE_URL}/userRoles`;
const BASE_URI_FAVOURITE_SONGS = `${BASE_URL}/favouriteSongs`;

export {
  BASE_URI_USER,
  BASE_URI_ARTIST,
  BASE_URI_SONG,
  BASE_URI_ROLES,
  BASE_URI_FAVOURITE_SONGS
};