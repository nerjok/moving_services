import React from 'react'
import { loadModules } from 'esri-loader';
import { Search } from './search/search'
const options = {
  url: 'https://js.arcgis.com/4.5/'
};

const styles =  {
  container: {
    height: '50vh',
    width: '100vw', background: 'gray'
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
          center: [23.903597, 54.898521]
        });
        view.then(() => {
          this.setState({
            map,
            view,
            status: 'loaded'
          });
        });
      })

  }

  renderMap() {
    if(this.state.status === 'loading') {
      return <div>loading</div>;
    }
  }

  render() {

    return(
          <div style={styles.container}>
            <div id='viewDiv' style={ styles.mapDiv } >
              {this.renderMap()}
              <div className="container" style={{ /*zIndex: '100',*/ position: 'absolute' , bottom: 10, left: 0, right: 0}}>
              <Search/>
              </div>
            </div>
          </div>
    )
  }
}

export default Map