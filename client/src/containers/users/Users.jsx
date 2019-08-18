import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import TableList from "../../components/table";
import Breadcrumb from "../../components/breadcrumb"

class Users extends React.Component {

  constructor(props) {
    super(props)
    this.pagination = this.pagination.bind(this)
  }

  state = {
    users: [],
    pages: {}
  }
  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = async (page = 1) => {
    const res = await axios.get('/api/users', {params:{page}})
    if (res.data.users && res.data.users.length > 0) {console.log('fetchdFetchd', res.data.page)
      this.setState({users: res.data.users, pages: {...res.data, users: []}});
    }
  }

  render() {
    return (
      <>
      <Breadcrumb links={[{link: "/profiles", title: "Users"}]} />
      <div>
        <TableList items={this.state.users} />

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
    const { pages: {page, hasPrevPage, hasNextPage} } = this.state
    let pagination = []
    if (hasPrevPage) {
      pagination.push(<Pagination.Prev key="prev-page" onClick={() => this.fetchUsers(+page - 1)}/>)
    }
    for (let number = 1; number <= page; number++) {
      pagination.push(
        <Pagination.Item key={number} active={number === page} onClick={() => this.fetchUsers(+number)}>
          {number}
        </Pagination.Item>,
      );
    }

    if (hasNextPage) {
      pagination.push(<Pagination.Next key="next-page" onClick={() => this.fetchUsers(+page + 1)}/>)
    }

    return pagination
  }
}


function mapStateToProps({auth}) {
  return {
      auth
  }
}

export default connect(mapStateToProps, null)(Users)
