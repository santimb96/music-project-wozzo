import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { login } from "../services/user.js";

const Login = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    login(email, password)
      .then((user) => {
        authContext.setUser(user.user);
        authContext.setUserRole(user.role);
        localStorage.setItem("userId", user.user._id);
        localStorage.setItem("token", user.token);
        localStorage.setItem("expiryDate", user.expiryDate);
        navigate('/backoffice/roles');
      })
      .catch(() => {
        navigate('/login');
      });
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12" style={{ maxWidth: "540px" }}>
            <div className="login-form bg-dark mt-4 p-4 text-light">
              <h4>SpotiClone</h4>
              <div className="mb-5 mt-5">
                <div className="mt-3">
                  <input
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                  ></input>
                </div>
                <div className="mt-3">
                  <input
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                  ></input>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-dark float-end submit-button p-2"
                  onClick={onLogin}
                >
                  Iniciar sesión
                </button>
              </div>
              <hr className="mt-4" />
              <div className="col-12">
                <h6 className="text-center mb-0">
                  Aún no tienes cuenta?{" "}
                  <div className="mt-3">
                    <Link className="change-route-link" to="/register">
                      Regístrate
                    </Link>
                  </div>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
