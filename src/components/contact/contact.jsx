//src\components\contact\contact.jsx

import React from "react";
import styles from "./contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/slice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  const handleDelete = () => {
    console.log("Deleting contact ID:", id);
    dispatch(deleteContact(id));
  };

  return (
    <li className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        {/* Контейнер для імені */}
        <div className="flex items-center space-x-3">
          <FaUser className={styles.icon} />
          <p className="ml-3">{name}</p>
        </div>
        {/* Контейнер для номера телефону */}
        <div className="flex items-center space-x-3 mt-3">
          <FaPhone className={styles.icon} />
          <span className="ml-3">{number}</span>
        </div>
        {/* Контейнер для кнопок */}
        <div className="card-actions justify-end">
          <button
            className="btn btn-error"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Contact;

<div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>
      A card component has a figure, a body part, and inside body there are
      title and actions parts
    </p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>;
