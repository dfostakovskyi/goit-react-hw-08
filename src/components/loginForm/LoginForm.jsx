// src/components/loginForm/LoginForm.jsx

import React from "react";
import PropTypes from "prop-types";

export const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-center text-xl font-bold uppercase">
          Login
        </legend>

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Email"
          required
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit" className="btn btn-outline btn-success mt-4">
          Login
        </button>
      </fieldset>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
