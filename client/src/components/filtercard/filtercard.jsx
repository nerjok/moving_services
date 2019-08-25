import React from 'react';
import { FilterCardItem } from './filterCardItem/filterCardItem';
import _ from 'lodash';

export const FilterCard = ({title, items, filterChange, name}) => {

  return (
    <>
    <h5 className="text-center">{title}</h5>
    <ul className="advertisement-statuses">
      {_.map(items, (item) => {
        return (
          <FilterCardItem 
            key={item.title}
            item={item}  
            filterChange={filterChange}
            name={name}
          />
        )
      })}
    </ul>
    </>
  )
}
