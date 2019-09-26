import React from 'react';
import PropTypes from 'prop-types';

export const SelectField = ({label, name, input, defaultValue, options, meta: {error, touched}}) => {
  return (
    <div className="form-group">
      <label className="widget__field-label" htmlFor={`input-${label}`}>{label}:</label>
      <div className="styled">
        <select
          className="select-field form-control"
          {...input}
          id={`input-${label}`}
        >
          <option value='' disabled>{label}</option>
          {options.map(({value, title}) => <option key={value + title} value={value} >{title}</option>)}
        </select>
      </div>
      <div className="text-danger" style={{marginBottom:'20px'}}>
        {touched && error}
      </div>
    </div>
  )
}
SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
}
