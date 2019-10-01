import React from 'react';
import { Trans } from 'react-i18next';
import _ from 'lodash';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import FIELDS from './formFields';
import { AdvertisementField } from './advertisementField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { updateAdvertisement, newAdvertisement, removeAdvertisement } from '../../../../store/actions';
import { MapInput } from './mapInput';
import Card from '../../../../hoc/cardBorders';
import { DateTimePicker } from './dateTimePicker';
import { SelectField } from './selectField';

class NewAdvertisement extends React.Component {

  submitForm = (values) => {
    const { formValues } = this.props
    if (formValues.values) {
      const advertisement = formValues.values
      return this.props.newAdvertisement(advertisement, this.props.history).then(data => {
        if (data && data.errors) {
          let wrongData = this.invalidServerData(data.errors);
          throw new SubmissionError(wrongData);
        }
      });
    }
  }

  invalidServerData = (errors) => {
    let wrongData = {}
    errors.forEach(err => {
      wrongData[err['param']] = err.msg
    })
    return wrongData;
  }

  render() {
    return (
      <Card showCard={this.props.advertisement && this.props.advertisement._id}>
      <form 
        onSubmit={this.props.handleSubmit(this.submitForm) }
        >
        {_.map(FIELDS, ({label, name, options}) => {
          let fieldComp;
          if (name === 'dateTime')
            fieldComp = DateTimePicker;
          else if (name === 'location')
           fieldComp = MapInput;
          else if (['status', 'workType', 'city'].includes(name))
            fieldComp = SelectField 
          else 
            fieldComp = AdvertisementField;   
          return (
              <Field
                  key={name}
                  type="text"
                  name={name}
                  options={['status', 'workType', 'city'].includes(name) ? options : []}
                  component={fieldComp}
                  label={<Trans>{label}</Trans>}
              />
          )
        })}

        <br/>
        <br/>
        <button type="submit" className="btn btn-outline-dark">Submit</button>
      </form>
      </Card>
  )
      }
}

const validate = (values) => {
  const errors= {};
 
  _.each(FIELDS, ({name})=>{
    if (!values[name] || ((values[name].length < 50 && ['description'].includes(name)) && !['location', 'status', 'workType'].includes(name)))
      errors[name] = "You must provide data!";
  })

  return errors
}

function mapStateToProps(state) {
  return {
      formValues: state.form.advertisementUpdate
  };
}


export default withRouter(reduxForm({
  validate,
  form: 'advertisementUpdate',
  initialValues: {}
})(connect(mapStateToProps, {updateAdvertisement, newAdvertisement, removeAdvertisement})(NewAdvertisement)));
