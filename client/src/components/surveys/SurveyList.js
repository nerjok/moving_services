import React, { Component} from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../store/actions'

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    render () {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card " key={survey._id}>
									<div className="card-body">
										<span className="card-title">{survey.title}</span>
										<p>{survey.body}</p>
										<p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>

										<a href="#a" className="badge badge-success"><b>Yes: {survey.yes}</b></a>
										<a href="#a" className="badge badge-danger"> <b>No: {survey.no}</b></a>
									</div>
                </div>
            )
        })
    }
}


function mapStateToProps({surveys}) {
    return { surveys };
}
export default connect(mapStateToProps, {fetchSurveys})(SurveyList)
