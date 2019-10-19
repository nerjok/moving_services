import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { loadModules } from "esri-loader";
import i18next from 'i18next';


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
    <div className="card user-card p-1 pb-0" style={{height: 'auto'}}>

      <div id="locus-search" style={{height:"1px", width: "100%", opacity: 0}}></div>

      <div className="row">

            <div className="col-md-12">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control " 
                  name="keyword" 
                  placeholder={i18next.t("search phrase")} 
                  onChange={setSearchStrings}
                  />
              </div>
            </div>


        <div className="col-md-12">
          <div id="search-input"></div>
        </div>

        <div className="col-md-12 mt-3 mb-3" >
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

        <div className="col-md-12">
          <div className="form-group m-0">
            <button type="submit" 
              data-ajax-response="map" 
              data-ajax-data-file="assets/external/data_2.php" 
              data-ajax-auto-zoom="1" 
              onClick={submitSearch}
              className="btn btn-sm btn-outline-success form-control"
            >
              {i18next.t('Filter')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


Search.propTypes = {
  filterAdvertisements: PropTypes.func.isRequired
}