import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import TableList from "../../components/table";
import Breadcrumb from "../../components/breadcrumb"
import PropTypes from 'prop-types';
import FilterCard from '../../components/filtercard';
import { fetchUsers } from '../../store/actions';

export class Users extends React.Component {

  state = {
    status: [],
    availableTime: [],
    city: []
  }

  constructor(props) {
    super(props)
    this.pagination = this.pagination.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
    this.filterChange = this.filterChange.bind(this);
  }

  filterChange({target}) {
    const {value, checked } = target;
    const name = target.getAttribute('name');

    var status  = this.state[name].slice()
    //console.log('statusState', status, typeof status)


      if (!checked) {
        status = status.filter(itm => itm != value);
      } else {
        status.push(value);
      }
      //console.log('statusSeting', status)
      this.setState({[name]: status})

    //console.log('FilterChangeFunction', target, target.value, target.checked, target.getAttribute('name'), this.state)
  }

  filterState() {
    const { status, availableTime, city } = this.state
    const data = {};
    if (status.length)
     data.status = status;
    if (availableTime.length)
      data.availableTime = availableTime;
    if (city.length)
      data.city = city;
    return data;
  }

  filterUsers() {
    const data = this.filterState();
    this.props.fetchUsers(1, data)
  }

  render() {
    const { users } = this.props;
    if (!users)
      return <div class="spinner-border mt-5"></div> 
    return (
      <>
        <Breadcrumb links={[{link: "/profiles", title: "Users"}]} />
        <div className="row advertisements-row--mobile">
          <div className="col-md-9"> 
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
          </div>
        
        <div className="col-md-3">
          <button 
            type="button"  
            onClick={this.filterUsers}
            className="btn btn-sm btn-outline-success form-control mb-3">Filter</button>
          <FilterCard 
            title={"User Status"} 
            items={[
              {title: 'Not Available', color: 'red', value: 1},
              {title: 'Available', color: 'green', value: 2},
              {title: 'Available future', color: 'blue', value: 3},
              {title: 'Part time', color: 'gray', value: 4},
            ]}
            name="status"
            filterChange={this.filterChange}
          />
          <FilterCard
            title={"Available times"}
            items={[
              {title: 'Working hours', value: 0},
              {title: 'Evenings', value: 1},
              {title: 'Weekends', value: 3},
              {title: 'Nights',  value: 4},
            ]}
            name="availableTime"
            filterChange={this.filterChange}
          />
          <FilterCard
            title={'Region of services'}
            items={[
              {title: "Vilnius", value: 9},
              {title: "Kaunas", value: 6}, 
              {title: "Klaipeda", value: 1},
              {title: "Siauliai", value: 4},
              {title: "Panevezys", value: 5},
              {title: "Marijampole", value: 7}, 
              {title: "Alytus", value: 8},
              {title: "Telsiai", value: 2}, 
              {title: "Utena", value: 10},
              {title: "Taurage", value: 3}, 
              {title: "Visa Lietuva", value: 11},
              {title: "Kita", value: 12},
            ]}
            name="city"
            filterChange={this.filterChange}
          />
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
      pagination.push(<Pagination.Prev key="prev-page" onClick={() => this.props.fetchUsers(+page - 1, this.filterState())}/>)
    }
    for (let number = 1; number <= totalPages; number++) {
      pagination.push(
        <Pagination.Item key={number} active={number === page} onClick={() => this.props.fetchUsers(+number, this.filterState())}>
          {number}
        </Pagination.Item>,
      );
    }

    if (hasNextPage) {
      pagination.push(<Pagination.Next key="next-page" onClick={() => this.props.fetchUsers(+page + 1, this.filterState())}/>)
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
