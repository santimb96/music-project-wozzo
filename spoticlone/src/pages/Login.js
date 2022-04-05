import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/formComponents/Input";
import LoginContext from "../contexts/LoginContext";

const Login = () => {

  const onSubmitted = () => {

  }
  return (
    <div className="container">
      
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="login-form bg-dark mt-4 p-4 text-light">
            <form onSubmit={onSubmitted} method="POST" className="row g-3">
              <h4>SpotiClone</h4>
              <Input key={'Email'} name={'Email'} />
              <Input key={'Contraseña'} name={'Contraseña'} />
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
              <p className="text-center mb-0">
                Aún no tienes cuenta?{" "}
                <small className="text-light">
                  <Link to="/register" />
                  Registrarse
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
