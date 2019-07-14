import React from 'react'
import { fetchAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'



export class Advertisement extends React.Component {

  state = {
    edit: false
  }

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  render() {
    const { advertisement } = this.props
    //var title, description;
    if (!advertisement)
      return null;

      const {title, description, _user: user } = advertisement;
    
    console.log('[[advertisement]]', advertisement, user);
    //return null;
    return (
      <div className="row mt-2 mb-2" >
        <div className="col-md-9">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Advertisement</h5>
              <div styles={{display:'block', background: 'gray'}}><b>Title:</b> {title}</div>        
              <br/>
              <div><b>Description</b> {description}</div>
            </div>
          </div>
        </div>
          <div className="col-md-3">
            <div className="card p-0 ">
              <div className="menu-navigation text-center p-3">
                <h5>{user && user.name}</h5>
              </div>
            
              &nbsp;
              <div className="p-2">
                
              {user && <><b>Email: </b>{user.email}</>} 

              <div className="float-right m-3">
                <button className="btn btn-sm btn-outline-success d-block m-1">Apply for a job</button>
                <button className="btn btn-sm btn-outline-info d-block m-1">Ask a question</button>
                <button className="btn btn-sm btn-outline-danger d-block m-1">Report add</button>
              </div>


              </div>


            </div>

          </div>
      </div>

    )
  }
}
/*
function validate(values) {
  console.log('[validate]', values)
  return {}
}
*/

const mapStateToProps = ({advertisements: {advertisements, total, page, advertisement}}) => ({advertisement, advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisement})(Advertisement)
