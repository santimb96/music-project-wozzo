const removeUserStorage = () => {
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

export {
  removeUserStorage
}