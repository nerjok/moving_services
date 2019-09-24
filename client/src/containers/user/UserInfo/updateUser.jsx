import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';

import { connect } from 'react-redux'
import { updateData } from '../../../store/actions/index'
import { reduxForm, Field, SubmissionError, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'


import { EDIT_INPUTS } from './fields';
import { UserField } from './field';
import { TextAreaField } from './textAreaField'; 
import { SelectField } from './selectField';

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
  console.log('formValuesProps', props.formStates)
  return (
    <>
      <form 
          onSubmit={props.handleSubmit(submitForm) }
        >
          {_.map(EDIT_INPUTS, ({name, type, title, value, disabled, options, multiple}) => {
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
                label={<Trans>{title}</Trans>}
              />
            )}
          )}


          <button type="submit" className="btn btn-sm btn-outline-dark"><Trans>Submit</Trans></button>
        </form>
      </>
  )
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}
const validate = values => {console.log('ValidationValues', values);
  let errors = {};
  _.each(EDIT_INPUTS, ({ name }) => {
    if (!values[name] || values[name].length < 10)
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
