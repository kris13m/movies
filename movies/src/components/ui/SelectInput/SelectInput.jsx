import React from 'react';
import './SelectInput.css';

/**
 * A completely generic and reusable "dumb" select (dropdown) component.
 * It's controlled by a parent component.
 *
 * PROPS:
 * - label: The text for the <label> tag.
 * - value: The currently selected value.
 * - onChange: A function to call with the new value when an option is selected.
 * - options: An array of objects, each with a 'value' and 'label' key.
 *   e.g., [{ value: 'id_1', label: 'Display Text 1' }]
 */
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