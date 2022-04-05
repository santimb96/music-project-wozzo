import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../components/formComponents/Input";
import LoginContext from "../contexts/LoginContext";

const Login = () => {
  const loginContext = useContext(LoginContext);

  const onSubmitted = (e) => {
    e.preventDefault();
    console.info(loginContext.login);
  };

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
              <Input key={"Email"} name={"Email"} />
              <Input key={"Contraseña"} name={"Contraseña"} />
              {/* <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label" for="rememberMe"> Remember me</label>
                            </div>
                        </div> */}
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
