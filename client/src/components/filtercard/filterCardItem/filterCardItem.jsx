import React from 'react';

export const FilterCardItem = ({item: {title, value, color = 'blue'}, filterChange, name, active}) => {
  return (
    <li className="advertisement-status" key={title}>
    <label className="advertisement-status__label" htmlFor={`filter-${title}`}>
      <input 
        type="checkbox" 
        name={name} 
        value={value} 
        id={`filter-${title}`} 
        className="checkbox-filter advertisement-status__filter" 
        onChange={filterChange}
        checked={active}
      />
      <span className={`advertisement-status__badge advertisement-status__badge--${color}`}>
        &nbsp; &nbsp; {title} &nbsp;
      </span>                
      <span className="checkbox-filter advertisement-status__filter-span"></span>
    </label>
  </li>
  )
}
