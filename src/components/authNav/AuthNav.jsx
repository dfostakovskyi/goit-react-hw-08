// src/components/authNav/AuthNav.jsx

import React from "react";
import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <nav>
      <ul className="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-box p-2">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
