// src/components/RestrictedRoute.jsx
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const RestrictedRoute = ({ element, redirectTo = "/contacts" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};

RestrictedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default RestrictedRoute;
