import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchMessages, addMessage } from '../../../../store/actions';
import Card from '../../../../hoc/cardBorders';
import Messaging from '../../../../components/messaging';
import { Link} from 'react-router-dom';

const MessagesList = (props) => {

  useEffect(() => {
    props.fetchMessages(props.match.params.id);
  }, []);

  const sendMessage = (message) => {
    const message_thread_id = props.match.params.id;
    props.addMessage({message, message_thread_id});
  }

  const { user: {_id: user_id }, msgThread: {sender_id, receiver_id, updatedAt, advertisement_id} } = props;
  return (
    <Card>
      <div >

        { props.msgThread.sender_id && <span className="d-block mb-2 text-right">
                  <b>Sender:</b> &nbsp;
                  <Link to={`/profiles/${(user_id == sender_id.id) ? receiver_id._id : sender_id._id}`} className="text-success">
                    {(user_id == sender_id.id) ? receiver_id.name : sender_id.name}
                  </Link>
                  {updatedAt && <>&nbsp; | &nbsp;<span className="text-success">{new Date(updatedAt).toDateString()}</span></>}
                  {advertisement_id && <>&nbsp; | &nbsp;
                  <Link to={`/advertisements/${advertisement_id}`} className="text-success">
                    <b>View advertisement</b>
                  </Link></>}
  
                </span>}


        {props.messages.map(({_id, message, sender_id, updatedAt}) =>
            <div 
              className={`row advertisements-row advertisements-row--${(user_id == sender_id.id || user_id == sender_id) ? 'green' : 'gray text-right'}`} 
              key={_id}
              >
              <div className="col-md-12">
                {message} 
                <br/>
                {(user_id != sender_id.id) &&<small className="d-inline-block mt-3 text-left"><b>Sender:</b> {sender_id.name}</small>}
                {updatedAt && <>&nbsp;  &nbsp;<small className="text-success">{new Date(updatedAt).toDateString()}</small></>}
              </div>
            </div>
          )}

        <Messaging  sendMsg={sendMessage}/>
      </div></Card>
  )
}

const mapStateToProps = ( {messages: {messages, msgThread}, auth: user}) => ({messages, user, msgThread});

export default connect(mapStateToProps, {fetchMessages, addMessage})(MessagesList);
