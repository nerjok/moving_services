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

  render() {console.log('[[advertisements]]', this.state.page)
    return (

      <div>
        <div style={{margin: '5rem'}}>
        <Link to={"/advertisements/new"}>New Advertisement</Link>
          Advertisements
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(this.props.advertisements, ({_id, title, description}) => 

              
              <tr>
                <td>#</td>
                <td>
                <Link to={`/advertisements/${_id}`}>{title}</Link>
                </td>
                <td>{description}</td>
                <td></td>
                <td>action
                  {/*// eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                  <a onClick={() => {console.log('deletion');this.props.deleteAdvertisement({page: this.state.page, id: _id})}}>Delete </a></td>
              </tr>
            )}
            </tbody>
          </table>
          <div style={{position: 'relative', padding: '1rem'}}>
            <div style={{//background:'green',
                          //padding: '1rem',
                          boxSizing: 'border-box',
                          //margin: 'auto auto',
                          //width: '40%',
                          //display: 'block',

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
{/*}
<Pagination
          activePage={this.state.page}
          itemsCountPerPage={5}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          
          innerClass={'pagination'}
          activeClass="active"
          itemClass="page-item"
          linkClass="page-link"

          subContainerClassName={'pages pagination'}
          previousClassName="page-link"
          nextClassName="page-link"
          activeLinkClass='active'
          
        />
    */}
          </div>
      </div>
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
