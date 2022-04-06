//import React from "react";
import { reject } from "bcrypt/promises";
import { BASE_URI_USER } from "../urls/userUrls";

const login = (email, password) => new Promise((resolve, reject) => {
  if(!email || !password) {
    reject('Error de parámetros');

  } else {
    fetch(`${BASE_URI_USER}/public/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => resolve(response.json()))
    .catch(err => reject(err))
  }
});

const register = (name, email, password) => new Promise((resolve, reject) => {

  if(!name || !email || !password){
    reject('Error de parámetros');
  } else {
    fetch
  } 
});

export {
  login
}