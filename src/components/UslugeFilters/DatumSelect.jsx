import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatumSelect = ({displayDate, handleDatumChange}) => (
    <div className="filters__field--datum">
      <FaRegCalendarAlt />
      <DatePicker
        id="filter--datum"
        dateFormat="dd/MM/yyyy"
        placeholderText="Odaberite datum"
        selected={displayDate}
        name="datum"
        minDate={new Date()}
        isClearable={true}
        onChange={handleDatumChange}
        popperPlacement="bottom"
        popperModifiers={{
          flip: {
            behavior: ["bottom"], // don't allow it to flip to be above
          },
        }}
        aria-label="Odaberite datum"
      />
    </div>
);

export default DatumSelect;
