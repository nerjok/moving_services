import React from 'react';
import { Link } from 'react-router-dom'
import SurveyList from './surveys/SurveyList'
const Dashboard = (props) =>  {
    return (
        <div>
            <SurveyList/>
            <div className="text-right">
            <br/>
                <Link to="/surveys/new" className="btn btn-sm btn-outline-dark">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;