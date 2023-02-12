import React, { useState } from "react";
import TextField from "../components/textField";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  return (
    <form action="">
      <TextField
        onChange={handleChange}
        name={"email"}
        label={"Электронная почта"}
        type={"text"}
        value={data.email}
      />
      <TextField
        onChange={handleChange}
        name={"email"}
        label={"Электронная почта"}
        type={"text"}
        value={data.email}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
      </div>
      <button type="button">Войти</button>
    </form>
  );
};

export default Login;
