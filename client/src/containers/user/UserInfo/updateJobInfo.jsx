import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { updateData } from '../../../store/actions/index'
import { reduxForm, Field, SubmissionError, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'


import { EDIT_INPUTS, SEARCH_JOB_INPUTS } from './fields';
import { UserField } from './field';
import { TextAreaField } from './textAreaField'; 
import { SelectField } from './selectField';

const UpdateJobInfo = (props) => {

  useEffect(() => {
    const { auth } = props
    if (auth) {
      // eslint-disable-next-line no-lone-blocks
      {_.each(SEARCH_JOB_INPUTS, ({name}) => props.initialValues[name] = auth[name])};
     }
  }, [])
  
  const submitForm = (values) => {console.log('submitFrom', values)
    props.updateData(values);
  }
  console.log('formValuesProps', props.formStates)
  return (
    <>
      <form 
          onSubmit={props.handleSubmit(submitForm) }
        >



  <h4 className="mb-3">Work search</h4>
  <hr/>
  {_.map(SEARCH_JOB_INPUTS, ({name, type, title, value, disabled, options, multiple}) => {
    let component = type == 'textArea' ? TextAreaField : type == 'select' ? SelectField : UserField; 

      return (
        <Field
          key={name}
          //type="text"
          name={name}
          disabled={disabled}
          component={component}
          options={options}
          multiple={multiple}
          label={title}
        />
      )}
    )}

          <button type="submit" className="btn btn-outline-dark">Submit</button>
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
const validate = values => {console.log('ValidationValues', values);
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
