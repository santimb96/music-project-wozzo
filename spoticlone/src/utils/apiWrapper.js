const get = (url, param) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject("wrong params");
    } else {
      fetch(`${url}`)
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }
  });

const getById = (url, param) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject("Parámetros incorrectos");
    } else {
      const token = localStorage.getItem("token");
      fetch(`${url}/${param}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }
  });

const put = (url, body) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject("wrong params");
    } else {
      const token = localStorage.getItem("token");
      fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }
  });

const post = (url, body) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject("Parámetros incorrectos");
    } else {
      const token = localStorage.getItem("token");

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }
  });

const deleteItem = (url) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject("Parámetros incorrectos");
    } else {
      const token = localStorage.getItem("token");
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    }
  });

export { get, getById, put, post, deleteItem };
