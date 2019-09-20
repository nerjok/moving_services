import React from 'react';

export const Test = props => {
  const clicked = tt => {
    console.log('componentClicked')
  }

  return (
    <button onClick={clicked}>tap</button>
  )
}