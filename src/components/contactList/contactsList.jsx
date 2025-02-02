//src\components\contactList\contactsList.jsx

import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../contact/contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.contactList}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))
      ) : (
        <p>Контактів не знайдено.</p>
      )}
    </ul>
  );
};

export default ContactList;
