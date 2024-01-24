import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import "../Styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="container-login">
      <div className="wrapper-login">
        <h1 className="title-login">Sign In</h1>
        <form className="form-login">
          <input
            className="input-login"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-login"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-login" onClick={handleClick} disabled={isFetching}>
            Login
          </button>
          {error && <span className="error-login">Something went wrong...</span>}
          <a href="#" className="link-login">Forgot your password?</a>
          <a href="#" className="link-login">Create a new account</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
