import React, { useReducer } from 'react';
import {connect } from 'react-redux';
import { Trans } from 'react-i18next';
import _ from 'lodash';

import { updateUserPassw } from '../../../store/actions/index';

const FIELDS = [ 
  {name: 'newPassword', type: 'password', title: 'New password', disabled: false},
  {name: 'repeatPassword', type: 'password', title: 'Repeat password', disabled: false},
  {name: 'currentPassword', type: 'password', title: 'Current password', disabled: false}
]

export const UpdatePassword = (props) => {

  const stateReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {...state, ...action.payload};
      default:
        return state;
    }
  }

  const [passwords, dispatch] = useReducer(stateReducer, [])

  const changeValue = ({target}) => dispatch({type: 'UPDATE', payload: {[target.getAttribute('name')]: target.value}});


  const submitData = () => props.updateUserPassw(passwords);
  

  return (
      <>
        {_.map(FIELDS, ({name, type, title, value, disabled}) => <React.Fragment key={name}>
          <div className="form-group">
            <label htmlFor={name}><Trans>{title}</Trans></label>
            <input name={name} type={type} className="form-control" id={name} onChange={changeValue}/>
          </div>
        </React.Fragment>
        )}
        <button type="button" onClick={submitData} className="btn btn-sm btn-outline-dark"><Trans>Submit</Trans></button>
      </>
  )
}


export default connect(null, { updateUserPassw })(UpdatePassword);
