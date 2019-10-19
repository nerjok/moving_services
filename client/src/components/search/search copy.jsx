import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { loadModules } from "esri-loader";
import i18next from 'i18next';


const styles = {
  input: {    
    boxShadow: 'inset 0px 0px 0px 30px rgba(0, 0, 0, 0.23)',
    color: '#fff',
    backgroundColor: '#333333',
    borderRadius: 0,
    border: 'none',
    opacity: 1
  },
  wrapperStyle: { width: 200, marginLeft: 20 },
  whiteCollor: {color: '#fff'}
}


export const Search = (props) => {

  const [location, setLocation] = useState([]);
  const [distance, setDistance] = useState(30);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadModules([
      "esri/widgets/Search",
      "esri/WebMap",
      "esri/views/MapView",
      "esri/tasks/Locator",
      "esri/Graphic",
    ]).then(([Search, WebMap, MapView, Locator, Graphic]) => {
  
    
      const map = new WebMap({ basemap: "dark-gray" });
      const view = new MapView({
        container: "locus-search",
        map,
        zoom: 15,
        center: [23.903597, 54.898521]
      });


      var searchLoc = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      });
      searchLoc.countryCode = "Lt";
      var searchWidget = new Search({
        view: view,
        position: "top-left",
        enableInfoWindow: false,
        popupEnabled: false,
        minSuggestCharacters: 4,
        includeDefaultSources: false,
        container: "search-input"
      });
      var sources = [
        {
          locator: searchLoc,
          countryCode: "Lt",
          placeholder: "Search by location",
          resultSymbol: {
            type: "picture-marker",
            url: "/public/assets/images/marker-32.png",
            size: 24,
            width: 24,
            height: 24,
            xoffset: 0,
            yoffset: 0
          }
        }
      ];
  
      searchWidget.sources = sources;

      searchWidget.on("select-result", function(event) {
        let latitude = event.result.feature.geometry.latitude;
        let longitude = event.result.feature.geometry.longitude;
        setLocation([latitude, longitude])
        return true;
      });

      searchWidget.on("search-clear", function(event){
        setLocation([]);
      });

    });
  }, [])
  
  const setSearchStrings = ({target}) => {
    setKeyword(target.value);
  }

  const changeVal = () => {}
  
  const submitSearch = () => props.filterAdvertisements(location, distance, keyword);

  return (
    <div 
      className="container-search" 
    >
      <div id="locus-search" style={{height:"1px", width: "100%", opacity: 0}}></div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  name="keyword" 
                  placeholder={i18next.t("search phrase")} 
                  style={styles.input}
                  onChange={setSearchStrings}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
        <div className="col-md-6">
          <div id="search-input"></div>
        </div>

        <div className="col-md-4" >
          <div className="input-range-container">
            <input 
              type="range" 
              min="10" max="50"  
              className="input__range" 
              id="myRange"
              value={distance}
              onChange={changeVal}
              onInput={({target}) => {
                setDistance(target.value)
              }}
            />
            <output className={"input__range__output"} id="rangevalue2">{distance} km.</output>
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <button type="submit" 
              data-ajax-response="map" 
              data-ajax-data-file="assets/external/data_2.php" 
              data-ajax-auto-zoom="1" 
              style={styles.input}
              onClick={submitSearch}
              className=" form-control-sm btn btn-sm btn-primary form-control"
            >
              {i18next.t('Filter')}
            </button>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
  )
}


Search.propTypes = {
  filterAdvertisements: PropTypes.func.isRequired
}