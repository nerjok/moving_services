/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { fetchAdvertisement, applyJob, sendMessage } from "../../store/actions";
import { connect } from "react-redux";
import Map from "../map/Map";
import UserCard from "../../components/userCard";
import BreadCrumb from "../../components/breadcrumb";
import "react-image-gallery/styles/css/image-gallery.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTools,
  faHandHoldingUsd,
  faBriefcase,
  faPhoneAlt,
  faCity
} from "@fortawesome/free-solid-svg-icons";
import { StatusBtn, WorkTypeBtn } from "../../components/statusBtn/statusBtn";
import Spinner from "../../components/spinner";
import ApplyJob from "../../components/applyJob";
import ImageGallery from "react-image-gallery";

import { withTranslation, Trans } from 'react-i18next';

const toGallery = (id, images) => {
  return images.map(image => ({
    original: `/public/images/${id}/${image}`
    //thumbnail: `/public/images/${id}/${image}`
  }));
};

export class Advertisement extends React.Component {
  state = { error: "" };
  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id);
    this.applyForJob = this.applyForJob.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  applyForJob = async message => {
    const {
      advertisement: {
        _id: advertisement_id,
        _user: { _id: receiver_id }
      }
    } = this.props;
    const data = { advertisement_id, receiver_id, message };

    this.props
      .applyJob(data)
      .then(succ => {
        this.setState({ error: succ.error });
      })
      .catch(err => console.log("err", err));
  };

  sendMessage(message) {
    const {
      advertisement: {
        _id: advertisement_id,
        _user: { _id: receiver_id }
      }
    } = this.props;
    this.props.sendMessage({ message, receiver_id, advertisement_id });
  }

  parentPath = () => {
    let  { url } = this.props.match;
    let ats = url.slice(0, url.lastIndexOf('/'))
    return ats
  }

  render() {
    const { advertisement } = this.props;
    if (!advertisement) return <Spinner />;
    let upDate = advertisement.updatedAt || advertisement.createdAt;
    if (upDate) {
      upDate = new Date(upDate).toDateString();
    }
    const {
      title,
      description,
      _user: user,
      payment,
      photos,
      skills,
      time,
      tools,
      _id,
      dateTime,
      status,
      workType,
      cityName
    } = advertisement;
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      ahourCycle: "h24"
    };

    let  { url } = this.props.match;
    if (url.length <=1 ) {
      url = '';
    }    
    const { t } = this.props;
    const brdCrumb = [
      { link: this.parentPath(), title: t("Advertisements") },
      { link: "#", title: t("Advertisement") }
    ];
    return (
      <>
        <BreadCrumb links={brdCrumb} />

        <div className="row mt-2 mb-2">
          <div className="col-md-12 mb-5">
            {photos && photos.length > 0 && (
              <div className="mt-5" style={{ border: "15px solid black" }}>
                <ImageGallery
                  showPlayButton={false}
                  showBullets={true}
                  showThumbnails={false}
                  items={toGallery(_id, photos)}
                />
              </div>
            )}
          </div>

          <div className="col-md-8 mb-5">
            <h3 className="card-title">{title}</h3>
            <hr />
            <div className="text-right">
              <span className="mr-1 p-1">
                <small><Trans>Published</Trans>: {upDate}</small>
              </span>

              <StatusBtn status={status} />
              <WorkTypeBtn status={workType} />
              <ApplyJob apply={this.applyForJob} />
            </div>
            <div className="float-right">
              {this.state.error && <small>{this.state.error}</small>}
            </div>

            <div className="mt-5 mb-5">
              {" "}
              <b><Trans>Description</Trans></b>
              <br /> {description}
            </div>
          </div>

          <div className="col-md-4 mb-1">
            <UserCard user={user} advertisement_id={_id}>

              {(user && user.phone) && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Phone</Trans> </b>
                  <span className="mt-1  ml-4 d-block">{user.phone}</span>
                </div>
              )}

              {(cityName && cityName.title) && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faCity}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Region</Trans> </b>
                  <span className="mt-1  ml-4 d-block">{cityName.title}</span>
                </div>
              )}

              {skills && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Skils and experience required</Trans> </b>
                  <span className="mt-1  ml-4 d-block">{skills}</span>
                </div>
              )}

              {tools && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faTools}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Tools required</Trans> </b>
                  <span className="mt-1  ml-4 d-block">{tools}</span>
                </div>
              )}
              {dateTime && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Precise time information</Trans> </b>
                  <span className="mt-1  ml-4 d-block">
                    {time && <div>{time}</div>}
                    {new Date(dateTime).toLocaleDateString("lt-LT", options)}
                  </span>
                </div>
              )}
              {payment && (
                <div className="mt-3">
                  <FontAwesomeIcon
                    icon={faHandHoldingUsd}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  <b> <Trans>Payment information</Trans> </b>
                  <span className="mt-1  ml-4 d-block">{payment}</span>
                </div>
              )}

              <div
                className="map mt-3"
                style={{
                  width: "100%",
                  minHeight: "300px",
                  background: "darkgray"
                }}
              >
                <Map location={advertisement.location} />
              </div>
            </UserCard>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  advertisements: { advertisements, total, page, advertisement }
}) => ({ advertisement, advertisements, total, page });
export default withTranslation()(connect(
  mapStateToProps,
  { fetchAdvertisement, applyJob, sendMessage }
)(Advertisement));
