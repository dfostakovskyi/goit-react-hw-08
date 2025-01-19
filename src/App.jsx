import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { SearchBox } from "./components/searchBox/SearchBox";
import { ContactForm } from "./components/contactForm/ContactForm";
import { addContact } from "./redux/contactsSlice";

import "./App.css";
import ContactList from "./components/contactList/contactsList";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <h1>Phonebook</h1>
          <ContactForm addContact={addContact} />
          <SearchBox />
          <ContactList />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
