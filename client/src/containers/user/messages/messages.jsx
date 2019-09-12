import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchMessagesThread } from '../../../store/actions';

import Card from '../../../hoc/cardBorders';
import { Link} from 'react-router-dom';


const Messages = (props) => {
  
  useEffect(() => {
    props.fetchMessagesThread();
  }, [])
  
  return (
    <Card showCard={false}>
      <h5>Messages</h5>
      <div>
        {props.messages.map(({_id, sender_id, receiver_id, message, advertisement_id}) => 
            <div key={_id}>{message} <br/>---{sender_id} ---<br/> {receiver_id}---<br/>
            {advertisement_id}
            <br/>
            <Link to={`/user/messages/${_id}`} style={{zIndex: 1}}>{_id}</Link>
            <br/><br/><br/></div>)}
      </div>
    </Card>
  )
}

const mapStateToProps = ({messageThreads: {messages}}) => ({messages});

export default connect(mapStateToProps, {fetchMessagesThread})(Messages);
