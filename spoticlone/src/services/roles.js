import { BASE_URI_ROLES } from "../urls/urls";

const getRoles = (token) => new Promise((resolve, reject) => {
  fetch(BASE_URI_ROLES, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => resolve(res.json()))
  .catch(err => reject(err))
});

export {
  getRoles
}