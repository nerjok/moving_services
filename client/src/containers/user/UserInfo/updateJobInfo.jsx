import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';

import { connect } from 'react-redux'
import { updateData } from '../../../store/actions/index'
import { reduxForm, Field, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'


import {  SEARCH_JOB_INPUTS } from './fields';
import { UserField } from './field';
import { TextAreaField } from './textAreaField'; 
import { SelectField } from './selectField';

const UpdateJobInfo = (props) => {
  const { auth } = props
  
  useEffect(() => {
    
    if (auth) {
      // eslint-disable-next-line no-lone-blocks
      {_.each(SEARCH_JOB_INPUTS, ({name}) => props.initialValues[name] = auth[name])};
     }
  }, [auth, props.initialValues])
  
  const submitForm = (values) => {
    props.updateData(values);
  }

  return (
    <>
      <form 
          onSubmit={props.handleSubmit(submitForm) }
        >



  <h4 className="mb-3"><Trans>Work search</Trans></h4>
  <hr/>
  {_.map(SEARCH_JOB_INPUTS, ({name, type, title, value, disabled, options, multiple}) => {
    let component = type === 'textArea' ? TextAreaField : type === 'select' ? SelectField : UserField; 

      return (
        <Field
          key={name}
          //type="text"
          name={name}
          disabled={disabled}
          component={component}
          options={options}
          multiple={multiple}
          label={<Trans>{title}</Trans>}
        />
      )}
    )}

          <button type="submit" className="btn btn-sm btn-outline-dark"><Trans>Submit</Trans></button>
        </form>
      </>
  )
}

function mapStateToProps(state) {
  return {
      auth: state.auth,
      formStates: getFormValues('userJobUpdate')(state)
  }
}
const validate = values => {
  let errors = {};
  if (values.status > 1) {
    _.each(SEARCH_JOB_INPUTS, ({ name }) => {
      if (!values[name] || (values[name].length < 10  && !['availableTime', 'status', 'city'].includes(name)))
        errors[name] = "You must provide data!";
    });
  }
  return errors;
}

export default withRouter(
  reduxForm({
  validate,
  form: 'userJobUpdate',
  initialValues: {},
  enableReinitialize: true
})(connect(mapStateToProps, { updateData })(UpdateJobInfo)));
