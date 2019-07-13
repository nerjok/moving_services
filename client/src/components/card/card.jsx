import React from 'react'
import { withRouter } from 'react-router';

export function cardComponent(Component) {
  const CardComponent = props => {
      return (
        <div className="card">
          <div className="card-body">
            {props.children}
            <Component {...props}/>
          </div>
        </div>
      )
  }
  return withRouter(CardComponent);
}
