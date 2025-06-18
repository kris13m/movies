import React from 'react';
import './SelectInput.css';


function SelectInput({ label, value, onChange, options = [], ...props }) {
  return (
    <div className="select-input-wrapper">
      {label && <label className="select-input-label">{label}</label>}
      <select
        className="shared-select-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        {/* Map over the standardized options array */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;