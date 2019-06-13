import React from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form';

import { fetchAdvertisement, updateAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import FIELDS from './formFields'
import { AdvertisementField } from './advertisementField'

import AdvertisementForm from './AdvertisementUpdateForm'

export class Advertisement extends React.Component {

  state = {
    edit: false
  }

  componentDidMount() {
    console.table('ID', this.props.match.params.id)
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  toggleEddit = () => this.setState({edit: !this.state.edit})

  show() {
    const {title, description, } = this.props.advertisement

    return (
      <>
        <div styles={{display:'block', background: 'gray'}}><b>Title:</b> {title}</div>        
        <br/>
        <div><b>Description</b> {description}</div>
      </>
    )
  }

  submitForm = (e) => {
    //e.preventDefault()
    console.log('submit')
  }

  update = () => {
    const {title, description, _id } = this.props.advertisement
    return <AdvertisementForm advertisement={this.props.advertisement} submitForm={this.submitForm}/>;
    return (
        <form 
          //action={`/api/advertisements/${_id}/update`} 
          onSubmit={this.props.handleSubmit(this.submitForm.bind(this)) }
          //onSubmit={()=> alert()}
          //method="post"
          >
          {_.map(FIELDS, ({label, name}) => {
            return (
              <>
                <Field
                    key={name}
                    type="text"
                    name={name}
                    component={AdvertisementField}
                    label={label}
                    input={{defaultValue: this.props.advertisement[name]}}
                />
              {/*<AdvertisementField
                label={label}
                name={name}
                input={{defaultValue: this.props.advertisement[name]}}
              />*/}
              </>
            )
          })}
          <button type="submit" className="btn btn-outline-dark">Submit</button>
        </form>
    )
  }

  render() {
    const { advertisement } = this.props
    if (!advertisement)
      return null;
    console.log('[[advertisement]]', this.props.advertisement)
    return (

      <div className="card" style={{marginTop: '2rem', marginBottom: '2rem'}}>
      <div className="card-body">
        <h5 className="card-title">Advertisement
        &nbsp;
          <FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggleEddit}/>
        </h5>
        {this.state.edit ? this.update() : this.show()}
      </div>
    </div>
    )
  }
}
function validate(values) {
  console.log('[validate]', values)
  return {}
}

const mapStateToProps = ({advertisements: {advertisements, total, page, advertisement}}) => ({advertisement, advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement})(Advertisement)
//const Adv = connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement})(Advertisement)

/*
export default reduxForm({
  validate,
  //asyncValidate: validate,
  form: 'advertisementUpdate',
  destroyOnUnmount: false
})(connect(mapStateToProps, {fetchAdvertisement, updateAdvertisement})(Advertisement));
/** */