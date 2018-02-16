import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'

var request = require("request");

const styles = {
  map: {
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '400px',
    height: '400px',
    marginBottom: '20px'
  }
};

export default class Map extends Component {
	constructor(props){
    super(props)
  }

  componentDidMount(){
    var options = { method: 'GET',
      url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ this.props.state + '.json',
      qs: {
        access_token: 'pk.eyJ1IjoicmF1bGNvZGVzIiwiYSI6ImNqN2RnaXRoNjBhMmEzMXBqZGUyZ21oMDAifQ.ABd3Qr89lGqFX6S2Yb6xag'
      }
    }
    request(options, function (error, response, body) {
      console.log(body)
      var map_json = JSON.parse(body)
      this.setState({lat: map_json.features[0].center[0], lon: map_json.features[0].center[1]})

      mapboxgl.accessToken = 'pk.eyJ1IjoicmF1bGNvZGVzIiwiYSI6ImNqN2RnaXRoNjBhMmEzMXBqZGUyZ21oMDAifQ.ABd3Qr89lGqFX6S2Yb6xag';
      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        center: [map_json.features[0].center[0], map_json.features[0].center[1]],
        zoom: 5,
        // style: 'mapbox://styles/raulcodes/cjdm8eov91dox2sqv4tiw4682',
        style: 'mapbox://styles/raulcodes/cjdoph8ss0ohq2rnivqmz9f0q',
      });

      this.map.addControl(new mapboxgl.NavigationControl())

    }.bind(this));


  }

  render(){
    return(
      <div>
      <div style={styles.map} ref={el => this.mapContainer = el} />
      </div>
    );
  }
}
