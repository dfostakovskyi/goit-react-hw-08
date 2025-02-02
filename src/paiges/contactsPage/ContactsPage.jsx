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
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-h-[100px]">
          <SearchBox />
        </div>

        <div className="min-h-[100px]">
          <div
            tabIndex={0}
            className="collapse bg-base-100 border border-base-300 mt-4 ml-4 rounded-box"
          >
            <div className="collapse-title font-semibold">
              Do you want to add one contact?
            </div>
            <div className="collapse-content text-sm">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 min-h-[200px]">
          <h1 className="text-2xl font-bold mb-4">Contacts</h1>
          {contacts.length === 0 ? <p>No contacts found.</p> : <ContactList />}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
