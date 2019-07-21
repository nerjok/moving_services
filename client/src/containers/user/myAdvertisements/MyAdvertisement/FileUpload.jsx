import React, { Component } from 'react'

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
    //this.setState({ uploading: true })

    let formData = new FormData()

    images.forEach((file, i) => {
      formData.append(i, file)
    })
/*
    console.log('photosSubmited', formData, 'FilesArray', files);

    for (var p of formData) {
      console.log('FormData', p);
    }*/

    this.setState({images})
/*
    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
    /** */
  }

  submitForm() {
    const { images } = this.state

    if (images.length) {
      let formData = new FormData()

      images.forEach((file, i) => {
        formData.append('photos[]', file)
      })
      
     //formData.append
      for (var p of formData) {
        console.log('FormData', p);
      }

      console.log("submitingForm", formData)
      this.props.uploadPhoto(this.props.id, formData);
    } else 
      console.log('Form is empty');
  }

  render() {
    return (
      <div>FileUpload
          <div className='buttons fadein'>
            <div className='button'>
              <label htmlFor='single'>Single file upload
              </label>
              <input type='file' id='single' onChange={this.onChange} /> 
            </div>
            
            <div className='button'>
              <label htmlFor='multi'>Multiple fiel upload
              </label>
              <input type='file' id='multi' onChange={this.onChange} multiple />
            </div>
            </div>

            <button onClick={this.submitForm}>Submit Photos</button>
      </div>
    )
  }
}


export default FileUpload;