import React from 'react'
import DatePicker, { registerLocale }  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { lt } from 'date-fns/esm/locale';


registerLocale('lt-Lt', lt);


export const DateTimePicker = ({label, name, input, defaultValue, meta: {error, touched}}) => {

  const setTime = value => input.onChange(value);
  return (
    <div className="form-group">
      <label htmlFor="email">{label}</label>
      <DatePicker
            className="form-control"
            selected={input.value}
            onChange={setTime}
            locale="lt-Lt"
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            placeholderText="Choose date"
            dateFormat="Pp"
          />
      <div className="text-danger" style={{marginBottom:'20px'}}>
        {touched && error}
      </div>
    </div>
  )
}
