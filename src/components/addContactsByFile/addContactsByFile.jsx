//src\components\addContactsByFile\addContactsByFile.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Papa from "papaparse";
import vCard from "vcard-parser";
import { addContacts } from "../../redux/contacts/slice";

const AddContactsByFile = () => {
  const dispatch = useDispatch();
  const [importStatus, setImportStatus] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      parseFileContent(fileContent, file.type, file.name);
    };
    reader.readAsText(file);
  };

  const parseFileContent = (content, fileType, fileName) => {
    if (fileType === "application/json" || fileName.endsWith(".json")) {
      parseJSON(content);
    } else if (fileType === "text/csv" || fileName.endsWith(".csv")) {
      parseCSV(content);
    } else if (fileName.endsWith(".vcf")) {
      parseVCF(content);
    } else {
      setImportStatus("Unsupported file format.");
    }
  };

  const parseJSON = (content) => {
    try {
      const contacts = JSON.parse(content);
      importContacts(contacts);
    } catch (error) {
      setImportStatus("Invalid JSON file.");
    }
  };

  const parseCSV = (content) => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const contacts = results.data.map((row) => {
          const nameFields = ["name", "firstName", "lastName", "fullname"]; // Add more potential name fields
          const phoneFields = ["phone", "mobile", "phoneNumber", "cell"]; // Add more potential phone number fields

          let name = "";
          nameFields.forEach((field) => {
            if (row[field]) {
              name = row[field];
              return; // Stop searching if a name field is found
            }
          });

          let number = "";
          phoneFields.forEach((field) => {
            if (row[field]) {
              number = row[field];
              return;
            }
          });

          return { name, number };
        });
        importContacts(contacts);
      },
      error: (error) => {
        setImportStatus("Error parsing CSV file.");
      },
    });
  };

  const parseVCF = (content) => {
    try {
      const card = vCard.parse(content);
      const contacts = card.map((entry) => ({
        name: entry.fn || "",
        number: entry.tel || "",
      }));
      importContacts(contacts);
    } catch (error) {
      setImportStatus("Error parsing VCF file.");
    }
  };

  const validateContact = (contact) => {
    return (
      contact.name &&
      contact.number &&
      contact.name.trim() &&
      contact.number.trim()
    );
  };

  const importContacts = (contacts) => {
    const validContacts = contacts.filter(validateContact).map((contact) => ({
      name: contact.name.trim(),
      number: contact.number.trim(),
    }));

    if (validContacts.length > 0) {
      dispatch(addContacts(validContacts));
      setImportStatus(
        `${validContacts.length} contacts imported successfully.`
      );
    } else {
      setImportStatus("No valid contacts found in the file.");
    }
  };

  return (
    <div className="import-component">
      <h2>Import Contacts</h2>
      <p>
        Select a file to import contacts. Supported formats: CSV, JSON, VCF.
      </p>
      <input
        type="file"
        accept=".csv, .json, .vcf"
        onChange={handleFileUpload}
      />
      {importStatus && <p>{importStatus}</p>}
    </div>
  );
};

export default AddContactsByFile;
