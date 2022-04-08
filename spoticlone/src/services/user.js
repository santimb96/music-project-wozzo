import { reject } from "bcrypt/promises";
import { BASE_URI_USER } from "../urls/urls";
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

  const autoLogin = (id, token) =>
  new Promise((resolve, reject) => {
    if (!id || !token) {
      reject("Error de parámetros");
    } else {
      fetch(`${BASE_URI_USER}/autologin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
        }),
      })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
    }
  });


const register = (name, email, password) =>
  new Promise((resolve, reject) => {
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
          userRoleId: "6246cedb97335a4a24ae3cb5",
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



  const createUser = (name, email, password, role, token) => new Promise((resolve, reject) => {
    
    const found = ROLES.find(r => r.role === role);

    if(!name && !email && !password && !found && !token){
      reject("Error de parámetros")
    } else {
      fetch(`${BASE_URI_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userRoleId: found.id,
        }),
      })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
    }
  });

  const removeUser = (id, token) => new Promise((resolve, reject) => {
    if(!id && !token){
      reject("Error en parámetros");
    } else {
      fetch(`${BASE_URI_USER}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
    };
  });

  const updateUser = (id, token) => new Promise((resolve, reject) => {
    if(!id && !token){
      reject("E")
    }
  }); 

export { login, register, autoLogin, getUsers, createUser, removeUser };
