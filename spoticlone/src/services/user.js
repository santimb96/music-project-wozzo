//import React from "react";
import { BASE_URI_USER } from "../urls/userUrls";

const login = (email, password) => {
  fetch(`${BASE_URI_USER}/public/login`, {
    method: 'POST',
    //mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(response => response.json())
  .then(userData => localStorage.setItem('userData', JSON.stringify(userData)))
  .catch(err => console.error(err))
}; 

export {
  login
}