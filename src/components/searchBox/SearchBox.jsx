import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/contactsSlice";
import { selectFilters } from "../../redux/contactsSlice";

import styles from "./searchBox.module.css";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilters);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value.toLowerCase()));
  };

  return (
    <div className={styles.searchBox}>
      <p>Find contacts by name</p>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={filterValue}
      />
    </div>
  );
};

export default SearchBox;
