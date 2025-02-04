// src/paiges/contactsPage/ContactsPage.jsx
// src/paiges/contactsPage/ContactsPage.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/contactList/contactsList";

import { fetchContacts } from "../../redux/contacts/operations";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="relative flex grow flex-col overflow: visible">
      <h1 className="text-2xl font-bold mb-6 mt-8 text-center">Contacts</h1>
      {contacts.length === 0 ? <p>No contacts found.</p> : <ContactList />}
    </div>
  );
};

export default ContactsPage;
