import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchMessages, addMessage } from '../../../../store/actions';

import Card from '../../../../hoc/cardBorders';
import Messaging from '../../../../components/messaging';
const MessagesList = (props) => {
  console.log('paramsMessagesList', props)

  useEffect(() => {
    props.fetchMessages(props.match.params.id);
  }, [])

  const sendMessage = (message) => {
    //const {advertisement: {_id: advertisement_id, _user: {_id: receiver_id}}} = this.props
    console.log('sendMessage', message);
    const message_thread_id = props.match.params.id;
    props.addMessage({message, message_thread_id});
  }

  return (
    <Card showCard={false}>
      <div>
        <h3>MessagesList</h3>
        {props.messages.map(({_id, message, sender_id}) =>
            <div key={_id}>{message} <small className="mt-3 d-block"><b>sender:</b> {sender_id}</small><hr/></div>
          )}

        <Messaging  sendMsg={sendMessage}/>
      </div>
    </Card>
  )
}

const mapStateToProps = ( {messages: {messages}, auth: user}) => ({messages, user});

export default connect(mapStateToProps, {fetchMessages, addMessage})(MessagesList)