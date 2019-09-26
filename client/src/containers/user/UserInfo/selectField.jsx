import React from 'react';

export const SelectField = ({label, name, input, defaultValue, disabled, options, multiple, meta: {error, touched}}) => {
  let inputVal = []
  if (multiple){
    if (Array.isArray(input.value))
      inputVal = input.value;
    else
      inputVal = [input.value];
  }
  return (
    <div className="form-group">
      <label htmlFor="email">{label}:</label>
      <select
        className="form-control"
        name={name} 
        multiple={multiple ? true : false } 
        {...input}
        value={ multiple ? inputVal : input.value}
      >
        <option disabled>Choose apropriate</option>
        {options.map(({title, value}) => <option 
                                            key={value} 
                                            //selected={value==input.value || (Array.isArray(input.value) && input.value.includes(value))} 
                                            value={value}>{title}</option> )}
      </select>
      
      <div className="text-danger" style={{marginBottom:'20px'}}>
        {touched && error}
      </div>
    </div>
  )
}
