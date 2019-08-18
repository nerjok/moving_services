import React from 'react'
import { connect } from 'react-redux'
import { myAdvertisements, deleteAdvertisement } from '../../../store/actions'
import { Advertisements } from '../../../components/advertisements/Advertisements'
import ReactPaginate from 'react-paginate'

export class MyAdvertisements extends React.Component {

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
    this.props.myAdvertisements(this.state.page)
  }

  currentUrlPath = () => {
    return this.props.history.location.pathname;
  }

  render() {
    return (
      <div className="container">

        <Advertisements 
          advertisements={this.props.advertisements} 
          location={this.currentUrlPath}
          activeAdvertisement={{}}
          />

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
    )
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  updatePage = ({selected}) => {

    this.setState({page: selected})
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', selected);
    if (this.props.history)
      this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

    this.props.myAdvertisements(selected)
  }
}

const mapStateToProps = ({advertisements: {advertisements, total, page}}) => ({advertisements, total, page });
export default connect(mapStateToProps, {myAdvertisements, deleteAdvertisement})(MyAdvertisements)
