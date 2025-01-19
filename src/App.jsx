import { SearchBox } from "./components/searchBox/SearchBox";
import { ContactForm } from "./components/contactForm/ContactForm";
import { addContact } from "./redux/contactsSlice";

import "./App.css";
import ContactList from "./components/contactList/contactsList";

const App = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
