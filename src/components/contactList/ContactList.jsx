import PropTypes from "prop-types";

import styles from "./ContactList.module.css";
import Contact from "../contact/contact";

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={styles.contactList}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
