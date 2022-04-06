import React, {useContext} from "react";
import LoginContext from "../../contexts/LoginContext";

const LoginFields = () => {

  const loginContext = useContext(LoginContext);
  const {email, password} = loginContext.login;

  console.log(loginContext);

  return (
    <div>
      <div className="col-12">
      <label>Email</label>
      <input
        onChange={(inputValue) => loginContext.setLogin({email: inputValue.target.value, password: password})}
        type="text"
        name="email"
        className="form-control"
        placeholder="Email"
      />
    </div><div className="col-12">
      <label>Password</label>
      <input
        onChange={(inputValue) => loginContext.setLogin({email: email ,password: inputValue.target.value})}
        type="password"
        name="password"
        className="form-control"
        placeholder="password"
        required
      />
    </div>
    </div>

  );
};

export default LoginFields;