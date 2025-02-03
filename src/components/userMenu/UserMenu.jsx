// src/components/userMenu/UserMenu.jsx

import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/operations";
import goitApi from "../../redux/auth/operations";
import ContactForm from "../contactForm/ContactForm";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const modalRef = useRef(null);

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
      <input
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <nav>
        <ul className="menu menu-horizontal bg-base-200 rounded-box p-2 gap-4 place-items-center">
          <li className="flex items-center">
            <button
              className="btn btn-success"
              onClick={() => modalRef.current?.showModal()}
            >
              Add Contact
            </button>
          </li>
          <li className="flex items-center">
            <button onClick={handleLogout} className="btn btn-warning">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Add New Contact
          </h2>
          <ContactForm />
        </div>
      </dialog>
    </div>
  );
};

export default UserMenu;
