import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'
import {
  Link
} from 'react-router-dom'
class Profiles extends React.Component {

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
      <div>
        Profiles
        <table className="table table-sm">
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>type</th>
          <th>Actions</th>
        </thead>
        <tbody>
        {this.state.users.map(user => {
          return [
            <td>{user._id}</td>,
            <td>{user.name}</td>,
            <td>{user.email}</td>,
            <td><Link to={"/profiles/"+user._id}>Show</Link></td>
          ];
        })}
        </tbody>
</table>
        <div className="text-xs-center">
          <br/>
          <ul className="pagination justify-content-center" styles={{margin: 'auto', display: 'inline', textAlign: 'center', background: 'green'}}>
            {this.pagination()}
          </ul>
      </div>
      </div>
    )
  }

  pagination = () => {
    const { pages: {page, hasPrevPage, hasNextPage} } = this.state
    let pagination = []
    if (hasPrevPage) {
      pagination.push(<Pagination.Prev onClick={() => this.fetchUsers(+page - 1)}/>)
    }
    for (let number = 1; number <= page; number++) {
      pagination.push(
        <Pagination.Item key={number} active={number === page} onClick={() => this.fetchUsers(+number)}>
          {number}
        </Pagination.Item>,
      );
    }

    if (hasNextPage) {
      pagination.push(<Pagination.Next onClick={() => this.fetchUsers(+page + 1)}/>)
    }

    return pagination
  }
}


function mapStateToProps({auth}) {
  return {
      auth
  }
}
export default connect(mapStateToProps, null)(Profiles)