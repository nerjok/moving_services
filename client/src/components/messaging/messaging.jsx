import React, { useState } from 'react'
import { Trans } from 'react-i18next';


export const Messaging = ({sendMsg}) => {
  const [text, setText] = useState('');
  
  const changeText = ({target}) => setText(target.value);

  const sendMessage = ({target}) => {
    sendMsg(text);
    setText('');
  }

  return (
    <div className="collapses mb-1 mt-1 p-3" id="messaging">
      <h5><Trans>Enter message</Trans></h5>

      <textarea rows="5" className="d-inline-block form-control input__invalid p-1" onChange={changeText} placeholderr={<Trans>Enter your message here</Trans>} value={text} required minLength={15}/>

      <br/>
      <button type="button" onClick={sendMessage} disabled={text.length > 15 ? false : true} className="btn btn-sm btn-success form-control"><Trans>Send</Trans></button>
    </div>
  )
}
