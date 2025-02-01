// src/paiges/contactsPage/ContactsPage.jsx

import ContactList from "../../components/contactList/contactsList";
import SearchBox from "../../components/searchBox/SearchBox";
import ContactForm from "../../components/contactForm/ContactForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  useEffect(() => {
    dispatch(fetchContacts()); // ✅ Завантажуємо контакти після входу
  }, [dispatch]);

  return (
    <div>
      <SearchBox />
      <ContactForm />
      <h1>Contacts</h1>
      {contacts.length === 0 ? <p>No contacts found.</p> : <ContactList />}
    </div>
  );
};

export default ContactsPage;
