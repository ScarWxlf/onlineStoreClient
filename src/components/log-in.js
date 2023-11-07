import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [data, setData] = useState({
      username: "",
      password: ""
    });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password
    };
    axios.post("/api/register", userData).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="mt-5">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="username"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Login;
