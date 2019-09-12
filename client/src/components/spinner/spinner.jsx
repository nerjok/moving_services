import React from 'react';

export const Spinner = (props) => {

  return (
    <div 
      style={{
        margin: '1rem', width: '100%', minHeight: '15rem', 
        background: '#fafafa', 
        position: 'relative', 
        textAlign: 'center'
      }} 
    >
      <div className="spinner-border" style={{marginTop:'7rem'}}></div>
    </div>
    )
}
