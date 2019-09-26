import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../../components/userCard';
import { fetchUserProfile, removeUserProfile, fetchRates } from '../../../store/actions';
import Spinner from '../../../components/spinner';
import Breadcrumb from '../../../components/breadcrumb';
import { Link} from 'react-router-dom';
//import PropTypes from 'prop-types';

export const Rates = (props) => {
  useEffect(() => {
    if (props.match && props.match.params){
      props.fetchUserProfile(props.match.params.id);
      props.fetchRates(props.match.params.id);
    }
    return () => {props.removeUserProfile()};
  }, [props.fetchRates, props.fetchRates, props.match])

  if (!props.user)
    return <Spinner/> 

  return (
    <>
      <Breadcrumb links={[{link: "/profiles", title: "Users"}, {link: `/profiles/${props.user._id}`, title: props.user.name}, {link: '#', title: 'User rates'}]} />
      <div className="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
        <div className="col-md-9 mb-1">

      
          <div className="cardd" >
            <div className="card-body">


              {props.rates.length > 0 && props.rates.map(({message, rate, rate_from, _id, createdAt}) => {
                return (
                  <div className="row advertisements-row advertisements-row--green" key={_id}>
                    <div className="col-md-10 advertisements-row__description">
                      <b>Message: </b> {message}
                      <br/>
                      <small>
                        <span className="text-success">{new Date(createdAt).toDateString()}</span>
                        &nbsp;|&nbsp;
                        <b>Rate: </b> {rate}
                        &nbsp;|&nbsp;
                        <b>RateFrom: </b>
                        <Link to={`/profiles/${rate_from._id}`} className="text-success">
                          {rate_from.name}
                        </Link>
                        
                      </small>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <UserCard user={props.user}/>
        </div>

      </div>    
    </>
  )
}

function mapStateToProps({user, auth, rates: {rates}}) {
  return {
      user, auth, rates
  }
}

export default connect(mapStateToProps, {fetchUserProfile, fetchRates, removeUserProfile })(Rates)
