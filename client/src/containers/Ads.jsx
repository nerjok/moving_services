import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import { Advertisements } from '../components/advertisements/Advertisements'; 
import TableList from "../components/table";
import { withTranslation, Trans } from 'react-i18next';


class Ads extends React.Component {

  componentDidMount() {
    this.props.fetchAdvertisements(0);
    this.props.fetchUsers();
  }

  render() {
    const { advertisements, users } = this.props
    const { i18n } = this.props;
    const { language } =   i18n;
    let url = '/profiles'
    if (language !== 'lt')
      url = `/${language}/profiles`;

    return (
      <div className="container">
        <div className="row">
        <div className="col-md-6 p-3">
        <h5 className="card-title"><Trans>Advertisements</Trans></h5>
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
          <h5 className="card-title"><Trans>Users</Trans></h5>
            <TableList 
                items={users} 
                url={url}
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

export default withTranslation()(connect(
  mapStateToProps,
  actions
)(Ads));
