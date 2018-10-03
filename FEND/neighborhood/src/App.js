import React, { Component } from 'react';
import './App.css';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper
} from 'google-maps-react';

//https://github.com/foursquare/react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'FZJEIKTWA0SBSEHBRPXWEEK0QDQ0YPRXW0AWMDVQR4JWQE3V',
  clientSecret: 'E0BY1JJE12A0I2DNZL5QIBPGTGQHRRJTBIQSDKJETOGN4KGQ',
});

const params = {
  "ll": "30.2672,-97.7431",
  "query": 'Library',
  limit: 10
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoom: 13,
      center: {
        lat: 30.2672,
        lng: -97.7431
      }
    };
  }

  componentDidMount() {
    foursquare.venues.getVenues(params)
      .then(res => {
        this.setState({
          items: res.response.venues
        });
      });
  }
  
  showMarkers() {
    this.state.items.map(item => {
      return {
        lat: item.location.lat,
        lng: item.location.lng
      }
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    return (
      <div className="wrapper">

      <input id="hamburger" type="checkbox" className="hamburger-checkbox"></input>
      <label htmlFor="hamburger" className="hamburger-label" role="button" aria-labelledby="menu">&#xf0c9;</label>
      
      <div role="navigation" className="sidebar">
        <ul className="places"> 
          {
            this.state.items.map(item => {
                return <li key={item.id}>
                {item.name}
                </li>
              })
            }
        </ul>
      </div>

      <main role="main" className="content">
        {/* <Map id="map" /> */}
        <Map 
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={this.state.center}
          zoom={this.state.zoom}
          center={this.state.center} >
          {
            this.state.items.map((item, i) => ( 
            <Marker 
              onClick={this.onMarkerClick}
              key={item.id}
              title={item.name}
              name={item.name}
              position = {
                {
                  lat: item.location.lat,
                  lng: item.location.lng
                }
              }
            />
          ))}  
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </main>
    </div>
    );
  }
}

// export default App;
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDaDo_jIBREgK5TKMwSEwrSfJa1mJLebgw')
})(App)
