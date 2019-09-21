import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import { Advertisements } from '../components/advertisements/Advertisements'; 
import TableList from "../components/table";

class Ads extends React.Component {

  componentDidMount() {
    this.props.fetchAdvertisements(0);
    this.props.fetchUsers();
  }

  render() {
    const { advertisements, users } = this.props
    console.log('renderADS', advertisements, users)
    return (
      <div className="container">
        <div className="row">
        <div className="col-md-6 p-3">
        <h5 className="card-title">Advertisements</h5>
          <Advertisements
            advertisements={advertisements}
            advCallback={()=> {}}
            activeAdvertisement={{}}
            deleteAdvertisement={()=> {}}
            page={0}
            location={()=> {return '/advertisements'}}
          />
        </div>
          <div className="col-md-6 p-3">
          <h5 className="card-title">Users</h5>
            <TableList 
                items={users} 
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users: {users}, advertisements: {advertisements}}) {
  return {
      users,
      advertisements
  }
}
export default connect(mapStateToProps, actions)(Ads)
