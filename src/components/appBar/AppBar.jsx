import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "/src/redux/auth/selectors";
import UserMenu from "../userMenu/UserMenu";
import Navigation from "../navigation/Navigation";
import AuthNav from "../authNav/AuthNav";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <Navigation /> {/* Render Navigation */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}{" "}
    </header>
  );
};

export default AppBar;
