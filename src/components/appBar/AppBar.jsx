// src/components/appBar/AppBar.jsx

import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "/src/redux/auth/selectors";
import UserMenu from "../userMenu/UserMenu";
import Navigation from "../navigation/Navigation";
import AuthNav from "../authNav/AuthNav";
import SearchBox from "../searchBox/SearchBox";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <header>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-18 grow basis-1/2 place-items-center justify-items-start px-4">
          <Navigation />
        </div>
        <div className="divider lg:divider-horizontal "></div>
        <div className="card bg-base-300 rounded-box grid h-18 grow basis-1/2 place-items-center justify-items-end px-4">
          {isLoggedIn ? <UserMenu /> : <AuthNav />}{" "}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
