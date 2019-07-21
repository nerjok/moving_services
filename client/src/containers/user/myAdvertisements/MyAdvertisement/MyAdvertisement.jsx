import React from 'react'
import { fetchAdvertisement, updateAdvertisement, uploadPhoto } from '../../../../store/actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import AdvertisementForm from '../updateForm/AdvertisementUpdateForm'
import FileUpload from './FileUpload'
export class MyAdvertisement extends React.Component {

  state = {
    edit: false
  }

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  toggleEddit = () => this.setState({edit: !this.state.edit})

  show() {
    const {title, description, _id } = this.props.advertisement

    return (
      <>
        <div styles={{display:'block', background: 'gray'}}><b>Title:</b> {title}</div>        
        <br/>
        <div><b>Description</b> {description}</div>
        <FileUpload uploadPhoto={this.props.uploadPhoto} id={_id}/>
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
export default connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement, uploadPhoto})(MyAdvertisement)
