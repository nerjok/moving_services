/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
//import _ from 'lodash'
import { fetchAdvertisements, deleteAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';
import {
  Link
} from 'react-router-dom'

export class Advertisements extends React.Component {

  constructor(props) {
    super(props)
  
    const url = new URL(window.location.href);
    let page = url.searchParams.get("page")
    page = isNaN(page) ? 0 : page

    this.state = {
      page
    }
  }
  
  componentDidMount() {

    this.props.fetchAdvertisements(this.state.page)
  }

  render() {
    return (
      <>
        <div className="text-center">
          <h5>Advertisements</h5>
          <small>Explore available advertisements</small>
        </div>
        <Link to={"/advertisements/new"} className="btn btn-sm btn-outline-success m-3 float-right">New Advertisement</Link>
        <div className="clearfix"></div>

            <div className="advertisements">
              {Array.from(this.props.advertisements, ({_id, title, description}) => 
              <div className="row advertisements-row advertisements-row--red">
                <div className="col-md-6 advertisements-row__description">
                  <h5><Link to={`/advertisements/${_id}`}>{title}</Link></h5>
                  {description}
                  </div>
                <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
                    <span className="badge badge-success advertisements-row__badge">Active</span>
                </div>
                <div className="col-md-1 flex">
                    <span className="advertisements-row__info-txt">Vilnius</span> 
                </div>
                <div className="col-md-3 flex">
                  <div className="advertisements-row__info-txt">
                    <Link to={`/advertisements/${_id}`} className="btn btn-sm btn-outline-info">View</Link>
                    <a href="#ff" className="btn btn-sm btn-outline-success">Remember</a>
                    <a className="btn btn-sm btn-outline-danger" onClick={() => {console.log('deletion');this.props.deleteAdvertisement({page: this.state.page, id: _id})}}>Delete </a>
                  </div>
                </div>
              </div>
              )}
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
      </>
    );
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  updatePage = ({selected}) => {
    const url = new URL(window.location.href);
    let old = url.searchParams.get("page")
    console.log('paramFromUri', old); 
    

    this.setState({page: selected})

    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', selected);
    this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

    this.props.fetchAdvertisements(selected)
  }

}


const mapStateToProps = ({advertisements: {advertisements, total, page}}) => ({advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisements, deleteAdvertisement})(Advertisements)
