import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { updateData } from '../../../store/actions/index'
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'


import { EDIT_INPUTS } from './fields';
import { UserField } from './field';

const UpdateUser = (props) => {

  useEffect(() => {
    const { auth } = props
    if (auth) {
      // eslint-disable-next-line no-lone-blocks
      {_.each(EDIT_INPUTS, ({name}) => props.initialValues[name] = auth[name])};
     }
  }, [])
  
  const submitForm = (values) => {
    props.updateData(values);
  }

  return (
    <>
      <form 
          onSubmit={props.handleSubmit(submitForm) }
        >
          {_.map(EDIT_INPUTS, ({name, type, title, value, disabled}) => <React.Fragment key={name}>
            <Field
              key={name}
              type="text"
              name={name}
              disabled={disabled}
              component={UserField}
              label={title}
            />
          </React.Fragment>
          )}
          <button type="submit" className="btn btn-outline-dark">Submit</button>
        </form>
      </>
  )
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}
const validate = values => {
  let errors = {};
  _.each(EDIT_INPUTS, ({ name }) => {
    if (!values[name] || (values[name].length < 10 ))
      errors[name] = "You must provide data!";
  })
  return errors;
}

export default withRouter(
  reduxForm({
  validate,
  form: 'userUpdate',
  initialValues: {},
  enableReinitialize: true
})(connect(mapStateToProps, { updateData })(UpdateUser)));
