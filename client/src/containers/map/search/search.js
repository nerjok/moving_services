import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'


const styles = {
  input: {    
    boxShadow: 'inset 0px 0px 0px 30px rgba(0, 0, 0, 0.23)',
    color: '#fff',
    //backgroundColor: '#4611a7',
    backgroundColor: '#333333',
    borderRadius: 0,
    border: 'none',
    opacity: 1
  },
  wrapperStyle: { width: 200, marginLeft: 20 },
  whiteCollor: {color: '#fff'}
}

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class Search extends React.Component {

  state = {
    value4: 1
  }
  render() {
  return (
    <div style={{boxSizing:'border-box', backgroundColor: '#000000', opacity: 0.8, /*backgroundColor: '#4611a7',*/ margin: 'auto', /*width: '60%',*/ height: 'inherit', padding: '0.5rem', boxShadow: '0.3rem 0.4rem 0.1rem rgba(0, 0, 0, 0.2)'}}>
      <div className="row">
        <div className="col-md-3 col-sm-2">
          <div className="form-group">
            <input type="text" className="form-control form-control-sm" name="keyword" placeholder="Enter keyword" 
            style={styles.input}
            />
          </div>
        </div>
        <div className="col-md-3 col-sm-2">
          <div className="form-group">
          <select className="form-control form-control-sm" name="city" tabIndex="-98" style={styles.input}>
                <option value="">Location</option>
                <option value="1">Kaunas</option>
                <option value="2">Vilnius</option>
                <option value="3">Klaipeda</option>
                <option value="4">Panevezys</option>
                <option value="4">Siauliai</option>
              </select>
          </div>
        </div>
        <div className="col-md-3 col-sm-2">
          <div className="form-group">
          <select className="form-control form-control-sm" name="city" tabIndex="-98" style={styles.input}>
                <option value="">Category</option>
                <option value="1">Kaunas</option>
                <option value="2">Vilnius</option>
                <option value="3">Klaipeda</option>
                <option value="4">Panevezys</option>
                <option value="4">Siauliai</option>
              </select>
          </div>
        </div>
        <div className="col-md-1 col-sm-4">
              <div className="form-group">
                <button type="submit" 
                  data-ajax-response="map" 
                  data-ajax-data-file="assets/external/data_2.php" 
                  data-ajax-auto-zoom="1" 
                  style={styles.input}
                  className=" form-control-sm btn btn-sm btn-primary pull-right darker">
                    Search
                  </button>
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
            <div className="row" style={styles.whiteCollor}>
              <div className="col-md-4">
                <input type="checkbox" id="horns" name="horns"/>
                <label htmlFor="horns">With prices</label>
              </div>
              <div className="col-md-4">
                <input type="checkbox" id="horns" name="horns"/>
                <label htmlFor="horns">Bill</label>
              </div>
              <div className="col-md-4">
                <input type="checkbox" id="horns" name="horns"/>
                <label htmlFor="horns">Flexible Hours</label>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div style={styles.wrapperStyle}>
              <Range min={0} max={30} defaultValue={[3, 10]} marks={{ 0: '0 EU', 30: '30 EU' }} tipFormatter={value => `${value} eu`} />
            </div>

          </div>
      </div>
    </div>
  )
  }
}
