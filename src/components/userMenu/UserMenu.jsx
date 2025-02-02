// src/components/userMenu/UserMenu.jsx
import { useDispatch, useSelector } from "react-redux";
import { FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/operations";
import goitApi from "../../redux/auth/operations";
import SearchBox from "../searchBox/SearchBox";

import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    goitApi.defaults.headers.common["Authorization"] = "";

    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4 justify-center">
      <div>Welcome, {user.name}!</div>
      <nav>
        <ul className="menu menu-horizontal bg-base-200 rounded-box p-2 gap-4 place-items-center">
          <li className="flex items-center">
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
