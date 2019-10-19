/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { filterAdvertisements } from "../../store/actions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Advertisements as AdvertisementsList } from "../../components/advertisements/Advertisements";

import Search from "../../components/search";
import Breadcrumb from "../../components/breadcrumb";
import Spinner from "../../components/spinner";
import FilterCard from "../../components/filtercard";
import { withTranslation } from "react-i18next";

export class Advertisements extends React.Component {
  constructor(props) {
    super(props);

    const url = new URL(window.location.href);
    let page = url.searchParams.get("page");
    page = isNaN(page) ? 0 : parseInt(page);
    this.state = {
      page,
      activeAdvertisement: {},
      status: [],
      workType: [],
      location: [],
      keyword: "",
      distance: 30
    };
    this.displayAdvertisementPopup = this.displayAdvertisementPopup.bind(this);
    this.searchAdvertisements = this.searchAdvertisements.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount() {
    const { page, location, distance, keyword, status, workType } = this.state;

    const his = window.history.state;
    if (his && this.props.advertisements.length) {
      try {
        const state = JSON.parse(his);
        this.setState({ ...state });
      } catch (e) {
        this.props.filterAdvertisements(
          page,
          location,
          distance,
          keyword,
          status,
          workType
        );
      }
    } else
      this.props.filterAdvertisements(
        page,
        location,
        distance,
        keyword,
        status,
        workType
      );
  }

  preventState = () =>
    window.history.pushState(JSON.stringify(this.state), "page 2");

  currentUrlPath = () => {
    if (this.props.history.location.pathname === "/") return "/advertisements";
    return this.props.history.location.pathname;
  };

  displayAdvertisementPopup({ target }) {
    const activeAdvertisement = this.props.advertisements.find(
      itm => itm._id === target.getAttribute("id")
    );
    this.setState({ activeAdvertisement });
  }

  searchAdvertisements(location, distance, keyword, page = 0) {
    this.setState({ location, distance, keyword, page });
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", 0);
    if (this.props.history)
      this.props.history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );

    this.props.filterAdvertisements(
      page,
      location,
      distance,
      keyword,
      this.state.status,
      this.state.workType
    );
    this.preventState();
  }

  changeStatus({ target }) {
    const { value, checked } = target;
    const name = target.getAttribute("name");

    var status = this.state[name].slice();

    if (!checked) {
      status = status.filter(itm => itm !== value);
    } else {
      status.push(value);
    }
    this.setState({ [name]: status });
  }

  render() {
    let { url } = this.props.match;
    if (url.length <= 1) {
      url = "";
    }
    const { t } = this.props;
    let page = 0;
    if (this.props.page) {
      page = this.props.page - 1;
    }
    return (
      <>
        {this.props.from !== "index" ? (
          <Breadcrumb links={[{ link: url, title: t("Advertisements") }]} />
        ) : null}
        <Link
          to={"/user/advertisements/new"}
          className="btn btn-sm btn-outline-success m-3 mr-0 float-right"
        >
          {t("New Advertisement")}
        </Link>

        <div className="clearfix"></div>

        <div className="row advertisements-row--mobile  scale-to">
          <div className="col-md-9">
            {!this.props.advertisements ||
            this.props.advertisements.length < 1 ? (
              <Spinner />
            ) : (
              <div className="advertisements">
                <AdvertisementsList
                  advertisements={this.props.advertisements}
                  location={this.currentUrlPath}
                  advCallback={this.displayAdvertisementPopup}
                  activeAdvertisement={this.state.activeAdvertisement}
                  deleteAdvertisement={this.props.deleteAdvertisement}
                  page={this.state.page}
                />
              </div>
            )}
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
                  pageCount={this.props.total}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  initialPage={page}
                  forcePage={page}
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
          </div>
          <div className="col-md-3">
            {this.props.from !== "index" ? (
              <Search filterAdvertisements={this.searchAdvertisements} />
            ) : null}
            <FilterCard
              title={t("Time info")}
              items={[
                { title: t("Part Time"), color: "red", value: 1 },
                { title: t("Full Time"), color: "green", value: 2 },
                { title: t("Freelance"), color: "blue", value: 3 },
                { title: t("Flexible Hours"), color: "gray", value: 4 }
              ]}
              name="workType"
              state={this.state.workType}
              filterChange={this.changeStatus}
            />

            <FilterCard
              title={t("Status")}
              items={[
                { title: t("Available"), color: "green", value: 1 },
                { title: t("Asap"), color: "red", value: 2 },
                { title: t("Pending"), color: "blue", value: 3 },
                { title: t("Near Future"), color: "gray", value: 4 }
              ]}
              name="status"
              state={this.state.status}
              filterChange={this.changeStatus}
            />
          </div>
        </div>
      </>
    );
  }

  handlePageChange = pageNumber => this.setState({ activePage: pageNumber });

  updatePage = ({ selected }) => {
    this.setState({ page: selected });

    const { location, distance, keyword, status, workType } = this.state;

    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", selected);
    if (this.props.history)
      this.props.history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );

    this.props.filterAdvertisements(
      selected,
      location,
      distance,
      keyword,
      status,
      workType
    );
    this.preventState();
  };
}

export const mapStateToProps = ({
  advertisements: { advertisements, total, page }
}) => ({ advertisements, total, page });

export default withTranslation()(
  connect(
    mapStateToProps,
    { deleteAdvertisement: () => {}, filterAdvertisements }
  )(Advertisements)
);
