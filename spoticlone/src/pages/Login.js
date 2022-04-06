import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginFields from "../components/formComponents/LoginFields";
import LoginContext from "../contexts/LoginContext";
import { login } from "../services/user.js";

const Login = () => {
  const loginContext = useContext(LoginContext);
  const {email, password} = loginContext.login;

  const onSubmitted = (e) => {
    e.preventDefault();
    login(email, password)
  };

  //min width from: 236px

  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12" style={{ maxWidth: "540px" }}>
          <div className="login-form bg-dark mt-4 p-4 text-light loginForm">
            <form onSubmit={onSubmitted} method="POST" className="row g-3">
              <h4>SpotiClone</h4>
              <LoginFields />
              <div className="col-12">
                <button type="submit" className="btn btn-dark float-end">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-12">
              <h6 className="text-center mb-0">
                Aún no tienes cuenta?{" "}
                <div className="mt-3">
                  <p className="text-light register-button">
                    <Link to="/register" />
                    Regístrate
                  </p>
                </div>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
