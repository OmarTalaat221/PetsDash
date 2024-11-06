import { FaSearch } from "react-icons/fa";
import "./style.css";

export default function CustomInputWithSearch({ label, ...props }) {
  return (
    <div className="input_group_search">
      <label>{label}</label>
      <div className="input">
        <input {...props} />
        <button className="searchIcon" onClick={props.handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
