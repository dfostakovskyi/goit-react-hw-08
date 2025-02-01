//src\components\navigation\Navigation.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        {/* Додайте інші посилання за потреби */}
      </ul>
    </nav>
  );
};

export default Navigation;
