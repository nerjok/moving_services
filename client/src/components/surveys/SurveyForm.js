import React, { Component } from 'react'

import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import validEmails from '../../utils/validateEmails'
import FIELDS from "./formFields"

class SurveyForm extends Component {
    render () {
        return (
        <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} className="form-horizontal">
            {this.renderFields()}
            <Link to="/surveys" className="btn btn-sm btn-outline-dark">Cancel</Link>
            <button type="submit" className="btn btn-sm btn-outline-success">
              Submit
            </button>
            </form>
        </div>
        );
    }

    renderFields() {
        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field
                    key={name}
                    type="tex"
                    name={name}
                    component={SurveyField}
                    label={label}
                />
            );
        });

    }
}

function validate(values) {console.log('[validate survey]')
    const errors= {};

    errors.recipients = validEmails(values.recipients || '');

    _.each(FIELDS, ({name})=>{
        if(!values[name]) {
            errors[name] = "You must provide data!"
        }
    })


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);