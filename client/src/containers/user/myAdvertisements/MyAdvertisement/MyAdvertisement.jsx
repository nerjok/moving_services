/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { fetchAdvertisement, updateAdvertisement, uploadPhoto, deletePhoto, removeAdvertisement } from '../../../../store/actions'
import { connect } from 'react-redux'

import AdvertisementForm from '../updateForm/AdvertisementUpdateForm'
import FileUpload from './FileUpload'
import { Tabs, Tab } from 'react-bootstrap';
export class MyAdvertisement extends React.Component {

  constructor(props) {
    super(props);

    this.deletePhoto = this.deletePhoto.bind(this);
  }

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  show() {
    const { title, description, payment, skills, time, tools } = this.props.advertisement

    return (
      <>
        <div styles={{display:'block', background: 'gray'}}><b>Title:</b> {title}</div>        
        <br/>
        <div><b>Description</b> {description}</div>
        <div><b>Skils and experience required</b>{skills}</div>
              <br/>
              <div><b>Time information</b>{time}</div>
              <br/>
              <div><b>Payment information</b>{payment}</div>
              <div><b>Tools required</b>{tools}</div>
              <br/>
      </>
    )
  }

  deletePhoto({target}) {
    let photoId = target.getAttribute("photo_id");
    console.log("deletePhoto", photoId);
    this.props.deletePhoto(this.props.advertisement._id, photoId);
  }

  photos = () => {
    const { _id, photos} = this.props.advertisement

    return (
      <>
        {photos && photos.map(photo => {
          return (<div key={photo} style={{position:'relative', width: "90%", margin: "5px"}}>
            <img src={`/public/images/${_id}/${photo}`}  width={"100%"} alt="image not displayd"/>
            <button
              className="btn btn-sm btn-danger" 
              photo_id={photo} 
              style={{position:"absolute", top: 5, right: 5}}
              onClick={this.deletePhoto}
              > 
              &#10005;
              {/*<FontAwesomeIcon icon={faTrash} size="lg" style={{color: 'white'}} />*/} 
            </button>
            </div>
          )
        })}
        <br/>
        <FileUpload uploadPhoto={this.props.uploadPhoto} id={_id}/>
      </>
    )
  }
  update = () => <AdvertisementForm advertisement={this.props.advertisement} submitForm={this.submitForm}/>

  render() {
    const { advertisement } = this.props
    if (!advertisement)
      return null;

    return (
      <>
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" unmountOnExit={true}>
        <Tab eventKey="home" title="Advertisement">
          {this.show()}
        </Tab>
        <Tab eventKey="profile" title="Edit">
          {this.update()}
        </Tab>
        <Tab eventKey="contact" title="Photos">
          {this.photos()}
        </Tab>
      </Tabs>
    </>
    );
  }
}

const mapStateToProps = ({advertisements: { advertisement }}) => ({advertisement });
export default connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement, uploadPhoto, deletePhoto, removeAdvertisement})(MyAdvertisement)
