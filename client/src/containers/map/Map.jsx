import React from 'react'
import { loadModules } from 'esri-loader';
const options = {
  url: 'https://js.arcgis.com/4.5/'
};

const styles =  {
  container: {
    height: '50vh',
    width: '100%', background: 'gray'
  },
  mapDiv: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%',
    position: 'relative'
  },
}

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading'
    }
  }

  componentDidMount() {
    loadModules(['esri/Map', 'esri/views/MapView'], options)
      .then(([Map, MapView]) => {
        const map = new Map({ basemap: "dark-gray" });
        const view = new MapView({
          container: "viewDiv",
          map,
          zoom: 15,
          center: [23.903597, 54.898521],
        });        
      })
  }

  render() {
    return (
      <div id='viewDiv' style={{width: '100%', height: '300px'} } />
    )
  }
}

export default Map
