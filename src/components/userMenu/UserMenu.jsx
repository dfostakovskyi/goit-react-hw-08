// src/components/userMenu/UserMenu.jsx

import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.userMenu}>
      <div>Welcome, {user.name}!</div>
      <nav>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box p-2">
          <li>
            <div className="flex items-center">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2">{user.name}</span>
            </div>
          </li>
          <li>
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
