import React, { Component } from 'react'
import { Trans } from 'react-i18next';


//change ProfilePhoto
class FileUpload extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  state = {
    images: [],
    uploading: false
  }

  onChange(e) {
    const images = Array.from(e.target.files)

    let formData = new FormData()

    images.forEach((file, i) => {
      formData.append(i, file)
    })

    this.setState({images})
  }

  submitForm() {
    const { images } = this.state

    if (images.length) {
      let formData = new FormData()

      images.forEach((file, i) => {
        formData.append('photos[]', file)
      })
      formData.append('type', 'profile_photo')

      this.props.uploadPhoto(this.props.id, formData);
    }
  }

  render() {
    return (
      <div>
          <div className='buttons fadein'>

            
            <div className='button'>
              <label htmlFor='multi'>Multiple fiel upload
              </label>
              <input type='file' id='multi' onChange={this.onChange} multiple={this.props.multi ? true : undefined} />
            </div>
            </div>

            <button className="btn btn-sm btn-outline-dark" onClick={this.submitForm}><Trans>Submit</Trans></button>
      </div>
    )
  }
}


export default FileUpload;