import { BASE_URI_SONG } from "../urls/urls";
import { BASE_URI_ARTIST } from "../urls/urls";

  const getSongs = () => new Promise((resolve, reject) => {
    fetch(BASE_URI_SONG)
    .then(res => resolve(res.json()))
    .catch(err => reject(err));
  });


  const createSong = (name, artistId, audioUrl, token) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('artistId', artistId);
    formData.append('audioUrl', audioUrl);

    if (!name || !artistId || !audioUrl || !token) {
      reject("Error de parámetros")
    } else {
      fetch(`${BASE_URI_SONG}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
    }
  });

  const removeSong = (id, token) => new Promise((resolve, reject) => {
    if(!id && !token){
      reject("Error en parámetros");
    } else {
      fetch(`${BASE_URI_SONG}/${id}`, {
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

  const getArtistBySongId = (id, token) => new Promise((resolve, reject) => {
    if(!id || !token){
      reject("Error en parámetros");
    } else {
      fetch(`${BASE_URI_ARTIST}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
    }
  });

  const updateSong = (id, name, artistId, audioUrl, token) => new Promise((resolve, reject) => {
    const formData = new FormData();
    if(name){
      formData.append('name', name);
    }
    formData.append('artistId', artistId);

    if(audioUrl){

      formData.append('audioUrl', audioUrl);
    }
    
    if(!id && !token){
      reject("Error en parámetros");
    }
    fetch(`${BASE_URI_SONG}/${id}`,{
      method: 'PUT',
      headers:  {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    .then(res => resolve(res.json()))
    .catch(err => reject(err));
  }); 

export { getSongs, createSong, removeSong, updateSong, getArtistBySongId };
