// src/components/Layout.jsx

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import AppBar from "./appBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
