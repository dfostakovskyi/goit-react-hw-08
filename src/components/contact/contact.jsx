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
    <li className={styles.contactItem}>
      <div className={styles.contactItemInfo}>
        <div className={styles.contactDetails}>
          <FaUser className={styles.icon} />
          <p>{name}</p>
        </div>

        <div className={styles.contactDetails}>
          <FaPhone className={styles.icon} />
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
