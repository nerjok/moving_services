import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchMessagesThread } from '../../../store/actions';
import { Trans } from 'react-i18next';
import i18next from 'i18next';

import Card from '../../../hoc/cardBorders';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,  faSearch } from '@fortawesome/free-solid-svg-icons';

const Messages = (props) => {
  const { language } =   i18next;
  let url = '';
  if (language != 'lt') {
    url = `/${language}`;
  }

  useEffect(() => {
    props.fetchMessagesThread();
  }, [])
  const { user: {_id: user_id } } = props;
  return (
    <>
      <div>
        {props.messages.map(({_id, sender_id, receiver_id, message, advertisement_id, updatedAt}) => 
            <div className="row advertisements-row advertisements-row--green" key={_id}>
              <div className="col-md-10 advertisements-row__description">
                <small className="d-block mb-2">
                  <b><Trans>User</Trans>:</b> &nbsp;
                  <Link to={`${url}/profiles/${(user_id == sender_id.id) ? receiver_id._id : sender_id._id}`} className="text-success">
                    {(user_id == sender_id.id) ? receiver_id.name : sender_id.name}
                  </Link>
                  {updatedAt && <>&nbsp; | &nbsp;<span className="text-success">{new Date(updatedAt).toDateString()}</span></>}
                  {advertisement_id && <>&nbsp; | &nbsp;
                  <Link to={`${url}/advertisements/${advertisement_id}`} className="text-success">
                    <b><Trans>View advertisement</Trans></b>
                  </Link></>}
                  &nbsp; | &nbsp;
                  <Link to={`${url}/profiles/${(user_id == sender_id.id) ? receiver_id._id : sender_id._id}/rate/${_id}`} className="text-success">
                    <Trans>Rate User</Trans>
                  </Link>
                  &nbsp; | &nbsp; 
                  <Link to={`${url}/user/messages/${_id}`} className="text-success">
                    <b><Trans>Read messages</Trans></b>
                  </Link>
                </small>
                <Link to={`${url}/user/messages/${_id}`} className="black-link" >
                  {message}
                </Link>
              </div>
              <div className="col-md-2 advertisements-row__description">
                <Link to={`${url}/profiles/${(user_id == sender_id.id) ? receiver_id.id : sender_id.id}`} style={{zIndex: 1}}>
                  <img src='/public/images/man_icon.svg' width="100px" alt='Image not found'/>
                </Link>
              </div>
            </div>
            )}
      </div>
    </>
  )
}

const mapStateToProps = ({messageThreads: {messages}, auth}) => ({messages, user: auth});

export default connect(mapStateToProps, {fetchMessagesThread})(Messages);
