import React from "react";
import { FaUsers } from "react-icons/fa";

const KapacitetInput = ({ kapacitet, handleInputChange }) => (
  <div className="filters__field--kapacitet">
    <FaUsers />
    <input
      type="number"
      name="kapacitet"
      value={kapacitet}
      min="0"
      id="filter--kapacitet"
      placeholder="Broj osoba"
      onChange={handleInputChange}
      aria-label="Kapacitet"
    />
  </div>
);

export default KapacitetInput;
