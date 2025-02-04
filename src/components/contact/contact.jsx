//src\components\contact\contact.jsx

import styles from "./contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/slice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <div className="flex items-center space-x-3">
          <FaUser className={styles.icon} />
          <p className="ml-3">{name}</p>
        </div>

        <div className="flex items-center space-x-3 mt-3">
          <FaPhone className={styles.icon} />
          <span className="ml-3">{number}</span>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn btn-error"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Contact;
