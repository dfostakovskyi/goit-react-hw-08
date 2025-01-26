//src\components\contact\contact.jsx

import React from "react";
import styles from "./contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa"; // Correct icon import
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  const handleDelete = () => {
    console.log("Deleting contact ID:", id); // Log contact ID
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactItemInfo}>
        <div className={styles.contactDetails}>
          <FaUser className={styles.icon} /> {/* Updated icon class */}
          <p>{name}</p>
        </div>

        <div className={styles.contactDetails}>
          <FaPhone className={styles.icon} /> {/* Updated icon class */}
          <span>{number}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
