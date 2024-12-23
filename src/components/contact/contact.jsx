import React from "react";
import PropTypes from "prop-types";
import styles from "./contact.module.css";
import { FaPhone } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";

function Contact({ contact, deleteContact }) {
  return (
    <li className={styles.contactItem}>
      <div className={styles.contactItemInfo}>
        <div className={styles.contactDetails}>
          <FaUserLarge className={styles.phoneIcon} />
          <p>{contact.name}</p>
        </div>

        <div className={styles.contactDetails}>
          <FaPhone className={styles.phoneIcon} />
          <span>{contact.number}</span>
        </div>
      </div>
      <button type="button" onClick={() => deleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
