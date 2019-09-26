import React from 'react'
import _ from 'lodash'
import { reduxForm, Field, SubmissionError } from 'redux-form';
import FIELDS from './formFields'
import { AdvertisementField } from './advertisementField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';


import { updateAdvertisement, newAdvertisement, removeAdvertisement } from '../../../../store/actions'
import { MapInput } from './mapInput'
import Card from '../../../../hoc/cardBorders';
import { DateTimePicker } from './dateTimePicker';
import { SelectField } from './selectField';


class AdvertisementForm extends React.Component {

  submitForm = (values) => {
    const { formValues } = this.props
    if (formValues.values) {
      const advertisement = formValues.values
   
      if (this.props.advertisement && this.props.advertisement._id) {
        advertisement.id = this.props.advertisement._id
        return this.props.updateAdvertisement(advertisement, this.props.history).then(data => {
          if (data && data.errors) {
            let wrongData = this.invalidServerData(data.errors);
            throw new SubmissionError(wrongData);
          } else {
            document.getElementById("noanim-tab-example-tab-home").click()
          }
        });
      } else {
        //this.props.newAdvertisement(advertisement, this.props.history);
      }
    }
  }

  invalidServerData = (errors) => {
    let wrongData = {}
    errors.forEach(err => {
      wrongData[err['param']] = err.msg
    })
    return wrongData;
  }

  componentDidMount() {
    const { advertisement } = this.props
    if (advertisement) {
      // eslint-disable-next-line no-lone-blocks
      {_.each(FIELDS, ({name}) => {
        if (name === 'location') {
          this.props.initialValues[name] = advertisement[name]['coordinates'];
        } else if (name === 'dateTime') { 
          if (advertisement[name])
            this.props.initialValues[name] = new Date(advertisement[name]);
        } else
          this.props.initialValues[name] = advertisement[name];
      })};
     }
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
            else if (['status', 'workType'].includes(name))
              fieldComp = SelectField 
            else 
              fieldComp = AdvertisementField;   
            return (
                <Field
                    key={name}
                    type="text"
                    name={name}
                    options={['status', 'workType'].includes(name) ? options : []}
                    component={fieldComp}
                    label={<Trans>{label}</Trans>}
                />
            )
          })}

          <br/>
          <br/>
          <button type="submit" className="btn btn-sm btn-outline-dark"><Trans>Submit</Trans></button>
        </form>
      </Card>
  )
      }
}

const validate = (values) => {
  const errors = {};
  _.each(FIELDS, ({ name }) => {
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
  initialValues: {},
  enableReinitialize: true
})(connect(mapStateToProps, { updateAdvertisement, newAdvertisement, removeAdvertisement })(AdvertisementForm)));
