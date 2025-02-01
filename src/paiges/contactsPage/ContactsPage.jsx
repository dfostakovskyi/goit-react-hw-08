// src/paiges/contactsPage/ContactsPage.jsx

import React from "react";
import ContactList from "../../components/contactList/contactsList";
import SearchBox from "../../components/searchBox/SearchBox";
import ContactForm from "../../components/contactForm/ContactForm";

const ContactsPage = () => {
  return (
    <div>
      <SearchBox />
      <ContactForm />
      <h2>Contacts</h2>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
