// src\App.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SearchBox } from "./components/searchBox/SearchBox";
import { ContactForm } from "./components/contactForm/ContactForm";
import { addContact, fetchContacts } from "./redux/contactsSlice";
import ContactList from "./components/contactList/contactsList";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts()).then((response) => {
      console.log("Fetched contacts: ", response.payload);
    });
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
