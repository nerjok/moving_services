import React from 'react'
import { TableItem } from './tableItem/tableItem'

import PropTypes from 'prop-types';

export const Table = ({items}) => Array.from(items, item =>  <TableItem key={item._id} {...item}/>)
  
Table.propTypes = {
  items: PropTypes.array.isRequired
}
