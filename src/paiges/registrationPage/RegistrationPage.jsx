// src\paiges\registrationPage\RegistrationPage.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/registrationForm/RegistrationForm";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name: event.target.elements.name.value.trim(),
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.password.value.trim(),
    };

    try {
      const response = await fetch(
        "https://connections-api.goit.global/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Signup failed");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <RegistrationForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegistrationPage;
