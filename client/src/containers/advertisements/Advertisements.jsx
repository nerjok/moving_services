/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
//import _ from 'lodash'
import { fetchAdvertisements, deleteAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom'

import { AdvertisementPopup } from './AdvertisementPopup'
import { Advertisements as AdvertisementsList } from '../../components/advertisements/Advertisements'

export class Advertisements extends React.Component {

  constructor(props) {
    super(props)
  
    const url = new URL(window.location.href);
    let page = url.searchParams.get("page")
    page = isNaN(page) ? 0 : parseInt(page)
    this.state = {
      page
    }
  }
  
  componentDidMount() {
    this.props.fetchAdvertisements(this.state.page)
  }

  currentUrlPath = () => {
    if (this.props.history.location.pathname === '/')
      return '/advertisements'
    return this.props.history.location.pathname
  }

  render() {
    return (
      <>
        <Link to={"/advertisements/new"} className="btn btn-sm btn-outline-success m-3 mr-0 float-right">New Advertisement</Link>

        <div className="clearfix"></div>
        <AdvertisementPopup/>

        <div className="row">
        <div className="col-md-9"> 
        
        <div className="advertisements">
          <AdvertisementsList advertisements={this.props.advertisements} location={this.currentUrlPath}/>
        </div>

          <div style={{position: 'relative', padding: '1rem', margin: '1.5rem'}}>
            <div style={{
                          boxSizing: 'border-box',
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}>
                      <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={this.props.total}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      initialPage={this.state.page}
                      forcePage={this.state.page}
                      onPageChange={this.updatePage}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      previousClassName="page-link"
                      nextClassName="page-link"
                      activeClassName={'active'}
                    />
            </div>
          </div>
          </div>
          <div className="col-md-3">
            {/*}
            <div className="text-center">
              <h5>Job Type</h5>
            </div>
              */}

            <ul className="advertisement-statuses">
              <li className="advertisement-status">
								<label className="advertisement-status__label" htmlFor="filter-2">
                  <input type="checkbox" id="filter-2" className="checkbox-filter advertisement-status__filter"/>
									<span className="advertisement-status__badge advertisement-status__badge--red">
										&nbsp; &nbsp; Part Time &nbsp;
									</span>                
                  <span className="checkbox-filter advertisement-status__filter-span"></span>
								</label>
              </li>

              <li className="advertisement-status">
								<label className="advertisement-status__label" htmlFor="filter-full">
                  <input type="checkbox" id="filter-full" className="checkbox-filter advertisement-status__filter"/>
									<span className="advertisement-status__badge advertisement-status__badge--green">
										&nbsp; &nbsp; Full time &nbsp;
									</span>                
                  <span className="checkbox-filter advertisement-status__filter-span"></span>
								</label>
              </li>

              <li className="advertisement-status">
								<label className="advertisement-status__label" htmlFor="filter-freelance">
                  <input type="checkbox" id="filter-freelance" className="checkbox-filter advertisement-status__filter"/>
									<span className="advertisement-status__badge advertisement-status__badge--blue">
										&nbsp; &nbsp; Freelance &nbsp;
									</span>                
                  <span className="checkbox-filter advertisement-status__filter-span"></span>
								</label>
              </li>

              <li className="advertisement-status">
								<label className="advertisement-status__label" htmlFor="filter-flex">
                  <input type="checkbox" id="filter-flex" className="checkbox-filter advertisement-status__filter"/>
									<span className="advertisement-status__badge advertisement-status__badge--gray">
										&nbsp; &nbsp; Flexible hours &nbsp;
									</span>                
                  <span className="checkbox-filter advertisement-status__filter-span"></span>
								</label>
              </li>
            </ul>


            <div className="text-center">
              <h5>Status</h5>
            </div>
              <ul className="advertisement-statuses">
                <li className="advertisement-status">
                  <label className="advertisement-status__label" htmlFor="filter-available">
                    <input type="checkbox" id="filter-available" className="checkbox-filter advertisement-status__filter"/>
                    <span className="advertisement-status__badge advertisement-status__badge--green">
                      &nbsp; &nbsp; Available &nbsp;
                    </span>                
                    <span className="checkbox-filter advertisement-status__filter-span"></span>
                  </label>
                </li>
                <li className="advertisement-status">
                  <label className="advertisement-status__label" htmlFor="filter-pending">
                    <input type="checkbox" id="filter-pending" className="checkbox-filter advertisement-status__filter"/>
                    <span className="advertisement-status__badge advertisement-status__badge--green">
                      &nbsp; &nbsp; Pending &nbsp;
                    </span>                
                    <span className="checkbox-filter advertisement-status__filter-span"></span>
                  </label>
                </li>
                <li className="advertisement-status">
                  <label className="advertisement-status__label" htmlFor="filter-asap">
                    <input type="checkbox" id="filter-asap" className="checkbox-filter advertisement-status__filter"/>
                    <span className="advertisement-status__badge advertisement-status__badge--green">
                      &nbsp; &nbsp; Asap &nbsp;
                    </span>                
                    <span className="checkbox-filter advertisement-status__filter-span"></span>
                  </label>
                </li>
                <li className="advertisement-status">
                  <label className="advertisement-status__label" htmlFor="filter-nearfuture">
                    <input type="checkbox" id="filter-nearfuture" className="checkbox-filter advertisement-status__filter"/>
                    <span className="advertisement-status__badge advertisement-status__badge--green">
                      &nbsp; &nbsp; Near future &nbsp;
                    </span>                
                    <span className="checkbox-filter advertisement-status__filter-span"></span>
                  </label>
                </li>
              </ul>
            
          </div>
          </div>
      </>
    );
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  updatePage = ({selected}) => {
//    const url = new URL(window.location.href);
//    let old = url.searchParams.get("page")
//    console.log('paramFromUri', old); 
    

    this.setState({page: selected})

    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', selected);
    if (this.props.history)
      this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

    this.props.fetchAdvertisements(selected)
  }

}


const mapStateToProps = ({advertisements: {advertisements, total, page}}) => ({advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisements, deleteAdvertisement})(Advertisements)
