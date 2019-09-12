import React, { useState } from 'react'


export const Messaging = ({sendMsg}) => {
  const [text, setText] = useState('message');
  
  const changeText = ({target}) => setText(target.value);

  const sendMessage = ({target}) => {
    console.log('message', text)
    sendMsg(text);
  }

  return (
    <div className="collapses mb-1 mt-1 p-3" id="messaging">
      <h5>Enter message</h5>

      <textarea rows="5" className="d-inline-block form-control input__invalid p-1" onChange={changeText} value={text} required minLength={15}/>

      <br/>
      <button type="button" onClick={sendMessage} disabled={text.length > 15 ? false : true} className="btn btn-sm btn-success">Send</button>
    </div>
  )
}
