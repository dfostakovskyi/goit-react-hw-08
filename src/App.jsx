// src\App.js

import { SearchBox } from "./components/searchBox/SearchBox";
import { ContactForm } from "./components/contactForm/ContactForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, fetchContacts } from "./redux/contactsSlice";
import ContactList from "./components/contactList/contactsList";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  useEffect(() => {
    // Виконання запиту на бекенд під час завантаження компонента
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={(contact) => dispatch(addContact(contact))} />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
