import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { arrow_down_eva } from "../../assets/svgIcons";

const CustomSelect = ({ inRow, onChange, label, required, data, ...props }) => {
  const [openList, setOpenList] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterValue, setFilterValue] = useState(""); // State for filtering
  const selectRef = useRef(null); // To detect clicks outside

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  // Filtered data based on the filter value
  const filteredData = data?.filter((item) =>
    item?.label.toLowerCase().includes(filterValue.toLowerCase())
  );












  return (
    <div className={`custom_select ${inRow ? "inRow" : ""}`} ref={selectRef}>
      {label && (
        <label>
          {label || ""}
          {required && <span>(*)</span>}
        </label>
      )}

      <div className="select_input_container">
        <input
          id="select_input"
          value={selectedValue.label || ""}
          onClick={() => setOpenList(!openList)}
          style={{
            cursor: "pointer",
          }}
          readOnly
          {...props}
        />
        <div className={`select_icon ${openList ? "active" : ""}`}>
          {arrow_down_eva}
        </div>

        {openList && (
          <div className="custom_select_list">
            {/* Filter input */}
            <input
              type="text"
              placeholder="Búsqueda..."
              className="filter_input"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              autoFocus
            />

            {/* Display filtered data */}
            {filteredData && filteredData.length >= 1 && Array.isArray(filteredData) ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onChange(item);
                    setSelectedValue(item);
                    setOpenList(false);
                    setFilterValue(""); // Clear the filter after selecting
                  }}
                  id="item_list"
                  className={`custom_select_item ${
                    item.value === selectedValue.value ? "active" : ""
                  }`}
                >
                  {item?.label}
                </div>
              ))
            ) : (
              <div className="no_results">No se encontraron resultados</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
