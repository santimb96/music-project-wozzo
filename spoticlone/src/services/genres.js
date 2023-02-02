import { get, put, deleteItem } from "../utils/apiWrapper";
import { BASE_URI_GENRES } from "../urls/urls";

const getGenres = async () => await get(`${BASE_URI_GENRES}`);

const postGenre = async (name, genreImg, token) => new Promise((resolve, reject) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('genreImg', genreImg);

  if (!name || !genreImg || !token) {
    reject("Error de parámetros")
  } else {
    fetch(`${BASE_URI_GENRES}`, {
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

const updateGenre = async (id, name, genreImg, token) => new Promise((resolve, reject) => {
  const formData = new FormData();
  if(name){
    formData.append('name', name);
  }
  if(genreImg){
    formData.append('genreImg', genreImg);
  }
  
  if(!id && !token){
    reject("Error en parámetros");
  }
  fetch(`${BASE_URI_GENRES}/${id}`,{
    method: 'PUT',
    headers:  {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  })
  .then(res => resolve(res.json()))
  .catch(err => reject(err));
}); 

const deleteGenre = async (id) => await deleteItem(`${BASE_URI_GENRES}/${id}`);

export {
  getGenres,
  postGenre,
  updateGenre,
  deleteGenre
};