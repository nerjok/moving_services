import React from 'react'
import { fetchAdvertisement, updateAdvertisement } from '../../../../store/actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import AdvertisementForm from '../updateForm/AdvertisementUpdateForm'

export class MyAdvertisement extends React.Component {

  state = {
    edit: false
  }

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  toggleEddit = () => this.setState({edit: !this.state.edit})

  show() {
    const {title, description } = this.props.advertisement

    return (
      <>
        <div styles={{display:'block', background: 'gray'}}><b>Title:</b> {title}</div>        
        <br/>
        <div><b>Description</b> {description}</div>
      </>
    )
  }

  update = () => <AdvertisementForm advertisement={this.props.advertisement} submitForm={this.submitForm}/>

  render() {
    const { advertisement } = this.props
    if (!advertisement)
      return null;
    //console.log('[[advertisement]]', this.props.advertisement)
    return (
      <>
        <h5 className="card-title">Advertisement
        &nbsp;
          <div style={{float:'right'}}>
            <FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggleEddit}/>
          </div>
        </h5>
        {this.state.edit ? this.update() : this.show()}
    </>
    )
  }
}

const mapStateToProps = ({advertisements: { advertisement }}) => ({advertisement });
export default connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement})(MyAdvertisement)
