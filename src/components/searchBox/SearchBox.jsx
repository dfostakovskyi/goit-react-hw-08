import PropTypes from "prop-types";
import styles from "./searchBox.module.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.searchBox}>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
