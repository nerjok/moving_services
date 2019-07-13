import React from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form';
import FIELDS from './formFields'
import { AdvertisementField } from './advertisementField'
import { connect } from 'react-redux'

import { updateAdvertisement, newAdvertisement } from '../../../../store/actions/'

class AdvertisementForm extends React.Component {

  submitForm = (values) => {
    const { formValues } = this.props
    if (formValues.values) {
      const advertisement = formValues.values

      if (this.props.advertisement && this.props.advertisement._id) {
        advertisement.id = this.props.advertisement._id
        this.props.updateAdvertisement(advertisement);
      } else
        this.props.newAdvertisement(advertisement);
    }
  }


  componentDidMount() {
    const { advertisement } = this.props
    if (advertisement)
      // eslint-disable-next-line no-lone-blocks
      {_.each(FIELDS, ({name}) => {
        this.props.initialValues[name] = advertisement[name];
      })};

  }
  render() {
    return (
      <form 
      onSubmit={this.props.handleSubmit(this.submitForm) }

        >
        {_.map(FIELDS, ({label, name}) => {
          return (
              <Field
                  key={name}
                  type="tex"
                  name={name}
                  component={AdvertisementField}
                  label={label}
                  //input={{defaultValue: this.props.advertisement[name]}}
              />
          )
        })}
        <button type="submit" className="btn btn-outline-dark">Submit</button>
      </form>
  )
      }
}

const validate = (values) => {
  const errors= {};
  //console.log('validate')
  _.each(FIELDS, ({name})=>{
    //if (!values[name])
      //errors[name] = "You must provide data!"
})
  return errors
}

function mapStateToProps(state) {
  return {
      formValues: state.form.advertisementUpdate
  };

}

export default reduxForm({
  validate,
  form: 'advertisementUpdate',
  destroyOnUnmount: false,
  initialValues: {},
})(connect(mapStateToProps, {updateAdvertisement, newAdvertisement})(AdvertisementForm));
