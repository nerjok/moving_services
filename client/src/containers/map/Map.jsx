import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';

export const Map = (props) => {

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView', "esri/Graphic"])
      .then(([Map, MapView, Graphic]) => {
        const map = new Map({ basemap: "streets-vector" });
        const view = new MapView({
          container: "viewDiv",
          map,
          zoom: 15,
          center: [23.903597, 54.898521],
        });      
        
        if (props.location && props.location.coordinates) {
          let [lat, lng] = props.location.coordinates
          let point = {
            type: "point",
            latitude: lat,
            longitude: lng
          }
          let markerSymbol = {
            type: "picture-marker",
            url: "/public/assets/images/marker-32.png",
            width: "24px",
            height: "30px"
          };
          
          let graphic = new Graphic()
          
          graphic.geometry = point;
          graphic.symbol = markerSymbol;
          view.graphics.add(graphic);
          view.center = [lng, lat];
        }

      })
  }, [props.location])
  
  return (
    <div id='viewDiv' style={{width: '100%', height: '300px'} } />
  )
}

export default Map
