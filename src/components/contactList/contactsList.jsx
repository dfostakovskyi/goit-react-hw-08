//src\components\contactList\contactsList.jsx

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectFilters } from "../../redux/contacts/selectors";
import Contact from "../contact/Contact";
import AlphabetSlider from "../alphabetSlider/AlphabetSlider";
import SearchBox from "../searchBox/SearchBox";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filters = useSelector(selectFilters);
  const [selectedLetter, setSelectedLetter] = useState("");
  const contactRefs = useRef({});
  const contactsContainerRef = useRef(null);

  // Застосовуємо фільтри до контактів
  const filteredContacts = contacts.filter((contact) => {
    const { name, number } = contact;
    const { name: nameFilter, number: numberFilter } = filters;

    const matchesName = nameFilter
      ? name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesNumber = numberFilter ? number.includes(numberFilter) : true;

    const matchesLetter = selectedLetter
      ? name.charAt(0).toUpperCase() === selectedLetter
      : true;

    return matchesName && matchesNumber && matchesLetter;
  });

  // Групуємо відфільтровані контакти за першою літерою
  const groupedContacts = _.groupBy(filteredContacts, (contact) =>
    contact.name.charAt(0).toUpperCase()
  );

  // Отримуємо список літер, які мають контакти
  const lettersWithContacts = Object.keys(groupedContacts);

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    if (contactRefs.current[letter]) {
      contactRefs.current[letter].scrollIntoView({ behavior: "smooth" });
    }
  };

  // Обробка кліку поза контейнером з контактами
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedLetter && // Перевіряємо, чи вибрана літера
        contactsContainerRef.current &&
        !contactsContainerRef.current.contains(event.target)
      ) {
        setSelectedLetter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedLetter]);

  return (
    <div className="flex relative">
      {/* Алфавітний слайдер */}
      <div className="absolute top-0 left-6 h-full w-[4rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <AlphabetSlider
          onSelectLetter={handleLetterSelect}
          selectedLetter={selectedLetter}
          lettersWithContacts={lettersWithContacts}
        />
      </div>

      {/* Основний контент */}
      <div className="ml-[6rem] flex flex-col w-full">
        <SearchBox />

        <div className="flex flex-col pb-8" ref={contactsContainerRef}>
          {lettersWithContacts.length > 0 ? (
            lettersWithContacts.sort().map((letter) => (
              <div
                key={letter}
                ref={(el) => (contactRefs.current[letter] = el)}
              >
                <h2 className="text-xl font-bold mt-4">{letter}</h2>
                {groupedContacts[letter].map((contact) => (
                  <div
                    key={contact.id}
                    className="collapse collapse-arrow bg-base-100 border border-base-300 mt-2"
                  >
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title font-semibold">
                      {contact.name}
                    </div>
                    <div className="collapse-content text-sm">
                      <Contact contact={contact} />
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Контактів не знайдено.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
