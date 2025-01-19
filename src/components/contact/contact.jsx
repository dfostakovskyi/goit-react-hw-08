import styles from "./contact.module.css";
import { FaPhone, FaUserLarge } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactItemInfo}>
        <div className={styles.contactDetails}>
          <FaUserLarge className={styles.phoneIcon} />
          <p>{name}</p>
        </div>

        <div className={styles.contactDetails}>
          <FaPhone className={styles.phoneIcon} />
          <span>{number}</span>
        </div>
      </div>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
