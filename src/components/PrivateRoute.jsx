// src/components/PrivateRoute.jsx
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ element, redirectTo = "/login" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
