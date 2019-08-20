import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import TableList from "../../components/table";
import Breadcrumb from "../../components/breadcrumb"
import PropTypes from 'prop-types';

import { fetchUsers } from '../../store/actions';

export class Users extends React.Component {

  constructor(props) {
    super(props)
    this.pagination = this.pagination.bind(this)
  }
  
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { users } = this.props;
    return (
      <>
      <Breadcrumb links={[{link: "/profiles", title: "Users"}]} />
      <div>
        <TableList 
          items={users.users} 
        />

        <div className="text-xs-center">
          <br/>
          <ul className="pagination justify-content-center" styles={{margin: 'auto', display: 'inline', textAlign: 'center', background: 'green'}}>
            {this.pagination()}
          </ul>
        </div>
      </div>
      </>
    )
  }

  pagination = () => {
    const { users } =  this.props
    const { page, hasPrevPage, hasNextPage, totalPages} = users
    let pagination = []
    if (hasPrevPage) {
      pagination.push(<Pagination.Prev key="prev-page" onClick={() => this.props.fetchUsers(+page - 1)}/>)
    }
    for (let number = 1; number <= totalPages; number++) {
      pagination.push(
        <Pagination.Item key={number} active={number === page} onClick={() => this.props.fetchUsers(+number)}>
          {number}
        </Pagination.Item>,
      );
    }

    if (hasNextPage) {
      pagination.push(<Pagination.Next key="next-page" onClick={() => this.props.fetchUsers(+page + 1)}/>)
    }

    return pagination
  }
}


function mapStateToProps({auth, users}) {
  return {
      auth,
      users
  }
}

Users.defaultProps = {
  users: [],
  auth: {},
  fetchUsers: () => []
}

export default connect(mapStateToProps, { fetchUsers })(Users)
