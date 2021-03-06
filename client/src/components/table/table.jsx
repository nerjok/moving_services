import React from 'react'
import { TableItem } from './tableItem/tableItem'

import PropTypes from 'prop-types';

export const Table = ({items, url}) => Array.from(items, item =>  <TableItem key={item._id} {...item} url={url}/>)
  
Table.defaultProps = {
  items: []
}

Table.propTypes = {
  items: PropTypes.array.isRequired
}
