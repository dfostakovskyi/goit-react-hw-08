// src\paiges\loginPage\LoginPage.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import LoginForm from "../../components/loginForm/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    dispatch(loginThunk(credentials))
      .unwrap()
      .then((response) => {
        console.log("Login successful, token:", response.token);
        // Перенаправлення користувача або інші дії
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
