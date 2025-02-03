//src\components\alphabetSlider\AlphabetSlider.jsx

import React from "react";

const AlphabetSlider = ({
  onSelectLetter,
  selectedLetter,
  lettersWithContacts,
}) => {
  // Генеруємо масив літер англійського алфавіту від 'A' до 'Z'
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <ul className="flex flex-col space-y-2">
      {letters.map((letter) => {
        const hasContacts = lettersWithContacts.includes(letter);
        const isActive = selectedLetter === letter;

        return (
          <li key={letter}>
            <button
              onClick={() => hasContacts && onSelectLetter(letter)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                hasContacts
                  ? isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-blue-500 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!hasContacts}
            >
              {letter}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default AlphabetSlider;
