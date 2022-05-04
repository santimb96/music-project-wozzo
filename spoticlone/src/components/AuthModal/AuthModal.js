import React from "react";

const AuthModal = ({ isOpen }) => {
  return (
    <div className="col-md-6">
      <div
        className="modal fade"
        id="modalLRForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog cascading-modal" role="document">
          <div className="modal-content">
            <div className="modal-c-tabs">
              <ul
                className="nav nav-tabs md-tabs tabs-2 light-blue darken-3"
                role="tablist"
              >
                <li className="nav-item waves-effect waves-light">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#panel7"
                    role="tab"
                  >
                    <i className="fas fa-user mr-1"></i>
                    Login
                  </a>
                </li>
                <li className="nav-item waves-effect waves-light">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#panel8"
                    role="tab"
                  >
                    <i className="fas fa-user-plus mr-1"></i>
                    Register
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane fade in show active"
                  id="panel7"
                  role="tabpanel"
                >
                  <div className="modal-body mb-1">
                    <div className="md-form form-sm mb-5">
                      <i className="fas fa-envelope prefix"></i>
                      <input
                        type="email"
                        id="modalLRInput1"
                        className="form-control form-control-sm validate"
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput1"
                      >
                        Your email
                      </label>
                    </div>

                    <div className="md-form form-sm mb-4">
                      <i className="fas fa-lock prefix"></i>
                      <input
                        type="password"
                        id="modalLRInput2"
                        className="form-control form-control-sm validate"
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput2"
                      >
                        Your password
                      </label>
                    </div>
                    <div className="text-center mt-2">
                      <button className="btn btn-info waves-effect waves-light">
                        Log in <i className="fas fa-sign-in ml-1"></i>
                      </button>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <div className="options text-center text-md-right mt-1">
                      <p>
                        Not a member?{" "}
                        <a  className="blue-text">
                          Sign Up
                        </a>
                      </p>
                      <p>
                        Forgot{" "}
                        <a  className="blue-text">
                          Password?
                        </a>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-info waves-effect ml-auto"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/*<!--/.Panel 7-->*/}

                {/* <!--Panel 8-->*/}
                <div className="tab-pane fade" id="panel8" role="tabpanel">
                  {/* <!--Body--> */}
                  <div className="modal-body">
                    <div className="md-form form-sm mb-5">
                      <i className="fas fa-envelope prefix"></i>
                      <input
                        type="email"
                        id="modalLRInput3"
                        className="form-control form-control-sm validate"
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput3"
                      >
                        Your email
                      </label>
                    </div>

                    <div className="md-form form-sm mb-5">
                      <i className="fas fa-lock prefix"></i>
                      <input
                        type="password"
                        id="modalLRInput4"
                        className="form-control form-control-sm validate"
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput4"
                      >
                        Your password
                      </label>
                    </div>

                    <div className="md-form form-sm mb-4">
                      <i className="fas fa-lock prefix"></i>
                      <input
                        type="password"
                        id="modalLRInput5"
                        className="form-control form-control-sm validate"
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput5"
                      >
                        Repeat password
                      </label>
                    </div>

                    <div className="text-center form-sm mt-2">
                      <button className="btn btn-info waves-effect waves-light">
                        Sign up <i className="fas fa-sign-in ml-1"></i>
                      </button>
                    </div>
                  </div>
                  {/* <!--Footer--> */}
                  <div className="modal-footer">
                    <div className="options text-right">
                      <p className="pt-1">
                        Already have an account?{" "}
                        <a  className="blue-text">
                          Log In
                        </a>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-info waves-effect ml-auto"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href=""
          className="btn btn-default btn-rounded my-3 waves-effect waves-light"
          data-toggle="modal"
          data-target="#modalLRForm"
        >
          Launch Modal LogIn/Register
        </a>
      </div>

      <div className="modal-dialog cascading-modal" role="document">
        {/* <!--Content--> */}
        <div className="modal-content">
          {/* <!--Modal cascading tabs--> */}
          <div className="modal-c-tabs">
            {/* <!-- Nav tabs --> */}
            <ul
              className="nav nav-tabs md-tabs tabs-2 light-blue darken-3"
              role="tablist"
            >
              <li className="nav-item waves-effect waves-light">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#panel1"
                  role="tab"
                  aria-selected="true"
                >
                  <i className="fas fa-user mr-1"></i>
                  Login
                </a>
              </li>
              <li className="nav-item waves-effect waves-light">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#panel2"
                  role="tab"
                  aria-selected="false"
                >
                  <i className="fas fa-user-plus mr-1"></i>
                  Register
                </a>
              </li>
            </ul>

            {/* <!-- Tab panels --> */}
            <div className="tab-content">
              {/* <!--Panel 1--> */}
              <div
                className="tab-pane fade in active show"
                id="panel1"
                role="tabpanel"
              >
                {/* <!--Body--> */}
                <div className="modal-body mb-1">
                  <div className="md-form form-sm mb-5">
                    <i className="fas fa-envelope prefix"></i>
                    <input
                      type="email"
                      id="modalLRInput6"
                      className="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput6"
                    >
                      Your email
                    </label>
                  </div>

                  <div className="md-form form-sm mb-4">
                    <i className="fas fa-lock prefix"></i>
                    <input
                      type="password"
                      id="modalLRInput7"
                      className="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput7"
                    >
                      Your password
                    </label>
                  </div>
                  <div className="text-center mt-2">
                    <button className="btn btn-info waves-effect waves-light">
                      Log in <i className="fas fa-sign-in ml-1"></i>
                    </button>
                  </div>
                </div>
                {/* <!--Footer--> */}
                <div className="modal-footer display-footer">
                  <div className="options text-center text-md-right mt-1">
                    <p>
                      Not a member?{" "}
                      <a  className="blue-text">
                        Sign Up
                      </a>
                    </p>
                    <p>
                      Forgot{" "}
                      <a  className="blue-text">
                        Password?
                      </a>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-info waves-effects ml-auto"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* <!--/.Panel 1--> */}

              {/* <!--Panel 2--> */}
              <div className="tab-pane fade" id="panel2" role="tabpanel">
                {/* <!--Body--> */}
                <div className="modal-body">
                  <div className="md-form form-sm mb-5">
                    <i className="fas fa-envelope prefix"></i>
                    <input
                      type="email"
                      id="modalLRInput10"
                      className="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput10"
                    >
                      Your email
                    </label>
                  </div>

                  <div className="md-form form-sm mb-5">
                    <i className="fas fa-lock prefix"></i>
                    <input
                      type="password"
                      id="modalLRInput8"
                      className="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput8"
                    >
                      Your password
                    </label>
                  </div>

                  <div className="md-form form-sm mb-4">
                    <i className="fas fa-lock prefix"></i>
                    <input
                      type="password"
                      id="modalLRInput9"
                      className="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput9"
                    >
                      Repeat password
                    </label>
                  </div>

                  <div className="text-center form-sm mt-2">
                    <button className="btn btn-info waves-effect waves-light">
                      Sign up <i className="fas fa-sign-in ml-1"></i>
                    </button>
                  </div>
                </div>
                {/* <!--Footer--> */}
                <div className="modal-footer">
                  <div className="options text-right">
                    <p className="pt-1">
                      Already have an account?{" "}
                      <a  className="blue-text">
                        Log In
                      </a>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-info waves-effect ml-auto"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* <!--/.Panel 2--> */}
            </div>
          </div>
        </div>
        {/* <!--/.Content--> */}
      </div>
    </div>
  );
};

export default AuthModal;
