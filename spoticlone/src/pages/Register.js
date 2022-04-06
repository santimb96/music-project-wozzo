import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/user";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    if (password === passRepeat){
      register(name, email, password)
      .then(user => {
        console.log(user);
        navigate('/login');
      })
      .catch(err => window.alert(err))
    } else {
      window.alert(password, passRepeat);
    }
  }


  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12" style={{ maxWidth: "540px" }}>
          <div className="login-form bg-dark mt-4 p-4 text-light loginForm">
            <h4>SpotiClone</h4>
            <div className="mb-5 mt-5">
            <div className="mt-3">
              <input
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                type="name" placeholder="name"
              ></input>
            </div>
            <div className="mt-3">
              <input
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                type="email" placeholder="email"
              ></input>
            </div>
            <div className="mt-3">
              <input
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="password"
              ></input>
            </div>
            <div className="mt-3">
              <input
                className="form-control"
                onChange={(e) => setPassRepeat(e.target.value)}
                type="password" placeholder="password"
              ></input>
            </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark float-end submit-button p-2"
                onClick={onRegister}
              >
                Registrarse
              </button>
            </div>
            <hr className="mt-4" />
            <div className="col-12">
              <h6 className="text-center mb-0">
                ¿Tienes cuenta?
                <div className="mt-3">
                    <Link className="change-route-link" to="/login">Inicia sesión</Link>
                </div>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;