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
        <div className="card">
					<div className="card-body">
            <h5>Please confirm entries</h5>

            {reviewFields}
            <button
            className="btn btn-sm btn-outline-dark"
            onClick={onCancel}>
            Back
            </button>

            <button 
            onClick={() => submitSurvey(formValues, history)}
            className="btn btn-sm btn-outline-success"
            >
              Send Survey
            </button>
					</div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));