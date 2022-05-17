import { BASE_URI_USER } from "../urls/urls";
import { deleteItem, post, put } from "../utils/apiWrapper";
import ROLES from "../utils/roleId";


const login = (email, password) =>
  new Promise((resolve, reject) => {
    if (!email || !password) {
      reject("Error de parámetros");
    } else {
      fetch(`${BASE_URI_USER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
    }
  });

const autoLogin = (id) => post(`${BASE_URI_USER}/autologin`, {id} );
  

const register = (name, email, password, role) =>
  new Promise((resolve, reject) => {
    let setRole = ROLES.find(r => r.role === role);

    if (!name || !email || !password) {
      reject("Error de parámetros");
    } else {
      fetch(`${BASE_URI_USER}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userRoleId: setRole ? setRole.id : "6246cedb97335a4a24ae3cb5" ,
        }),
      })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
    }
  });

  const getUsers = (token) => new Promise((resolve, reject) => {
    fetch(BASE_URI_USER, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => resolve(res.json()))
    .catch(err => console.warn(err))
  });

  const createUser = (name, email, password, role) => {
    const found = ROLES.find(r => r.role === role);
    post(`${BASE_URI_USER}`, {name, email, password, userRoleId: found.id})
  }

  const removeUser = (id) => deleteItem(`${BASE_URI_USER}/${id}`);

  const updateUser = (id, edited) => put(`${BASE_URI_USER}/${id}`, edited);

export { login, register, autoLogin, getUsers, createUser, removeUser, updateUser };
