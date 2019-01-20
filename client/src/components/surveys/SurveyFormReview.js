import React from 'react'
import { connect } from 'react-redux'
import FIELDS from "./formFields"
import _ from 'lodash'
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/index'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(FIELDS, ({name, label}) => {
        return (
            <div key={name}>
                <div >
                    <label>{label}</label> 
                    <div>{formValues[name]}</div>
                </div>
            </div>
        )
    });

    return (
        <div>
            <h5>Please confirm entries</h5>

            {reviewFields}
            <button
            className="yellow darken-3 btn-flat white-text"
            onClick={onCancel}>
            Back
            </button>

            <button 
            onClick={() => submitSurvey(formValues, history)}
            className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){console.log('state', state)
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));