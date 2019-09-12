import React, { useState} from 'react';
import PropTypes from 'prop-types';

export const ApplyJob = ({apply}) => {
  let initText = 'Hi there, i would like to apply for provided advertisement. As description and time suis to me, \
  but there some details i would like to get further, please let me know.';

  const [text, setText] = useState(initText);
  
  const changeText = ({target}) => setText(target.value);

  const applyFor = (e) => {
    apply(text);
    document.location.hash = "";
  }

  const disableMod = ({target}) => {
    if (target.id == 'apply-job')
      document.location.hash = "";
  }

  return (
    <>
      <a href="#apply-job" className="badge advertisements-row__badge badge--green d-inline ml-1">Apply</a>
      <div className="popup-modal" id="apply-job" onClick={disableMod}>
        <div className="popup-modal__content p-3">
          <a href="#advertisements" className="popup-modal__close">&times;</a>
          <h5 className="popup-modal__content__title text-left">Apply</h5>
          <div className="text-center">
            <p>
              Fill fields bellow to apply to for this add
            </p>
            <textarea rows="5" className="d-inline-block form-control input__invalid" onChange={changeText} value={text} required minLength={15}/>

            <br/>
            <button 
              type="button" 
              onClick={applyFor}
              disabled={text.length > 15 ? false : true} 
              className="btn btn-sm btn-success">
                Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


ApplyJob.propTypes = {
  apply: PropTypes.func.isRequired
}
