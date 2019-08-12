import React from 'react'


export const CardBorders = props => {
  if (props.showCard)
    return props.children;
  return (
    <div className="card">
    <div className="card-body">
      {props.children}
    </div>
  </div>
  )
}
