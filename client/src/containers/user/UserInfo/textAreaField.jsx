import React from 'react';

export const TextAreaField = ({label, name, input, defaultValue, disabled, meta: {error, touched}}) => {
  return (
    <div className="form-group">
      <label htmlFor="email">{label}:</label>
      <textarea
        name={name} 
        {...input}
        className="form-control rounded-0" 
        rows="5"
      >
        {defaultValue}
      </textarea>
      <div className="text-danger" style={{marginBottom:'20px'}}>
        {touched && error}
      </div>
    </div>
  )
}
