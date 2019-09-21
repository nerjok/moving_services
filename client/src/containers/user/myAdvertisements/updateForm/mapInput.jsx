import React, {useEffect, useState} from "react";
import { loadModules } from "esri-loader";

export const MapInput = ({label, name, input, defaultValue, onChange, meta: {error, touched}}) => {
  const [location, setLocation] = useState([]);

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

      let graphic = new Graphic()

      setLocation([view, graphic]);


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
        container: "locus-search2"
      });
      var sources = [
        {
          locator: searchLoc,
          countryCode: "Lt",
          placeholder: "Searching",
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
        input.onChange([latitude, longitude]);
        return true;
      });
    });
  }, [])
  
  
  useEffect(() => {
    let point = {
      type: "point",
      latitude: input.value[0],
      longitude: input.value[1]
    }
    let markerSymbol = {
      type: "picture-marker",
      url: "/public/assets/images/marker-32.png",
      width: "24px",
      height: "30px"
    };

    const [view, graphic] = location
    if (view && graphic && input.value) {
      graphic.geometry = point;
      graphic.symbol = markerSymbol;
      view.graphics.add(graphic);
      view.center = [input.value[1], input.value[0]];
    }
  }, [input.value, location])

  return (
    <>
      <label htmlFor="email">{label}</label>
      <div id="locus-search2" style={{width:"100%", height: "50px"}}></div>
      {input.value}
      <div className="text-danger" style={{marginBottom:'20px'}}>
          {touched && error}
        </div>
      <br/>
      <div id="locus-search" style={{height:"300px", width: "100%"}}></div>
    </>
  )
};


MapInput.propTypes = {
  //setLocation: PropTypes.func.isRequired
}
