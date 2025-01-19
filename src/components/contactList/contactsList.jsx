import { useSelector } from "react-redux";
import { selectContacts, selectFilters } from "../../redux/contactsSlice";
import Contact from "../contact/contact";

import styles from "./contactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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
