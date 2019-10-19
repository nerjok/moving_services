import React from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withTranslation, Trans } from "react-i18next";

import TableList from "../../components/table";
import Breadcrumb from "../../components/breadcrumb";
import PropTypes from "prop-types";
import FilterCard from "../../components/filtercard";
import { fetchUsers } from "../../store/actions";

export class Users extends React.Component {
  state = {
    status: [],
    availableTime: [],
    city: [],
    keyword: ""
  };

  constructor(props) {
    super(props);
    this.filterUsers = this.filterUsers.bind(this);
    this.filterChange = this.filterChange.bind(this);

  }

  componentDidMount() {
    const his = window.history.state
    if (his && (this.props.users.users && this.props.users.users.length) ) {
      try {
        const state = JSON.parse(his)
        this.setState({...state})
      } catch(e) {
        this.props.fetchUsers();
      }
    } else
      this.props.fetchUsers();
  }

  filterChange({ target }) {
    const { value, checked } = target;
    const name = target.getAttribute("name");

    var status = this.state[name].slice();
    if (!checked) {
      status = status.filter(itm => itm !== value);
    } else {
      status.push(value);
    }
    this.setState({ [name]: status }, () => {this.preventState()});
  }

  setKeyword = ({ target }) => {
    const keyword = target.value;
    this.setState({ keyword }, ()=> {this.preventState()});
  };

  preventState = () => {
    const state  = { ...this.state }

    let stt = JSON.stringify(state)
    window.history.pushState(stt, "page 2");
  }

  filterState() {
    const { status, availableTime, city, keyword } = this.state;
    const data = {};
    if (keyword) 
      data.keyword = keyword;
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
    this.props.fetchUsers(1, data);
    this.preventState()
  }

  render() {
    const { t } = this.props;
    const { users } = this.props;
    let { url } = this.props.match;
    if (url.length <= 1) {
      url = "";
    }
    if (!users) return <div class="spinner-border mt-5"></div>;

    return (
      <>
        <Breadcrumb links={[{ link: url, title: "Users" }]} />
        <div className="row advertisements-row--mobile scale-to">
          <div className="col-md-9">
            <div>
              <TableList items={users.users} url={url} />
              {this.reactPagination()}
            </div>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              maxLength="80"
              className="form-control mb-3"
              placeholder={t("search phrase")}
              name="keyword"
              onChange={this.setKeyword}
            />
            <button
              type="button"
              onClick={this.filterUsers}
              className="btn btn-sm btn-outline-success form-control mb-3"
            >
              <Trans>Filter</Trans>
            </button>
            <FilterCard
              title={t("User Status")}
              items={[
                { title: t("Not Available"), color: "red", value: 1 },
                { title: t("Available"), color: "green", value: 2 },
                {
                  title: t("Available future"),
                  color: "blue",
                  value: 3
                },
                { title: t("Partly"), color: "gray", value: 4 }
              ]}
              name="status"
              state={this.state.status}
              filterChange={this.filterChange}
            />
            <FilterCard
              title={t("Available times")}
              items={[
                { title: t("Working hours"), value: 0 },
                { title: t("Evenings"), value: 1 },
                { title: t("Weekends"), value: 3 },
                { title: t("Nights"), value: 4 }
              ]}
              name="availableTime"
              state={this.state.availableTime}
              filterChange={this.filterChange}
            />
            <FilterCard
              title={t("Region of services")}
              items={[
                { title: "Vilnius", value: 9 },
                { title: "Kaunas", value: 6 },
                { title: "Klaipeda", value: 1 },
                { title: "Siauliai", value: 4 },
                { title: "Panevezys", value: 5 },
                { title: "Marijampole", value: 7 },
                { title: "Alytus", value: 8 },
                { title: "Telsiai", value: 2 },
                { title: "Utena", value: 10 },
                { title: "Taurage", value: 3 },
                { title: "Visa Lietuva", value: 11 },
                { title: "Kita", value: 12 }
              ]}
              name="city"
              state={this.state.city}
              filterChange={this.filterChange}
            />
          </div>
        </div>
      </>
    );
  }

  reactPagination = () => {
    const { users } = this.props;
    const { page, totalPages } = users;
    const { t } = this.props;

    return (
      <div
        style={{
          position: "relative",
          padding: "1rem",
          margin: "1.5rem"
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <ReactPaginate
            previousLabel={t("Previous")}
            nextLabel={t("Next")}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            initialPage={page - 1}
            forcePage={page - 1}
            onPageChange={this.updatePage}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            previousClassName="page-link"
            nextClassName="page-link"
            activeClassName={"active"}
            disableInitialCallback={true}
          />
        </div>
      </div>
    );
  };

  updatePage = ({ selected }) => {
    this.setState({ page: selected });
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", selected);
    if (this.props.history)
      this.props.history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    this.props.fetchUsers(+selected + 1, this.filterState());

    this.preventState()
  };
}

function mapStateToProps({ auth, users }) {
  return {
    auth,
    users
  };
}

Users.defaultProps = {
  users: [],
  auth: {},
  fetchUsers: () => []
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default withTranslation()(
  connect(
    mapStateToProps,
    { fetchUsers }
  )(Users)
);
