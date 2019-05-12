import React from 'react'



export default ({input, label, meta: {error, touched}}) => {
    return (
        <div className="form-group">
            <label className="control-label col-sm-2">{label}</label>
            <div className="col-sm-10">
                <input {...input} className="form-control" style={{marginBottom: '5px'}}/>
            
            <div className="text-danger" style={{marginBottom:'20px'}}>
            {touched && error}
            </div>
            </div>
        </div>
    )
}