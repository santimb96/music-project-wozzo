import React, { useEffect } from 'react';
import { BASE_URI_USER } from '../../urls/urls';
import { useNavigate } from "react-router-dom";

function VerifyUser() {

  const navigate = useNavigate();


  useEffect(()=> {
  const uriToString = window.location.href.toString();
  const getToken = uriToString.slice(uriToString.lastIndexOf('/')+1, uriToString.length);

  fetch(`${BASE_URI_USER}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getToken,
    })
  })
  .then((data) => {
    console.log(data);
    navigate('/list');
  })
  .catch((err) => console.warn(err));

  }, []);

  return (
    <div className="text-light">Verified</div>
  )
}

export default VerifyUser;
