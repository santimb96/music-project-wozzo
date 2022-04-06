import { BASE_URI_USER } from "../urls/userUrls";

const login = (email, password) =>
  new Promise((resolve, reject) => {
    if (!email || !password) {
      reject("Error de parámetros");
    } else {
      fetch(`${BASE_URI_USER}/public/login`, {
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
      fetch(`${BASE_URI_USER}/public/register`, {
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

export { login, register, autoLogin };
