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
      venues: [],
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
          venues: res.response.venues,
          markers: res.response.venues
        });
      });
  }
  
  showMarkers() {
    this.state.venues.map(venue => {
        return {
        lat: venue.location.lat,
        lng: venue.location.lng
      }
    })
    
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    }
  );

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  
  listItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.onMarkerClick(marker);
  }
  
  render() {
    
    return (
      <div className="wrapper" style={{ height: '100vh', width: '100%' }}>

      <input id="hamburger" type="checkbox" className="hamburger-checkbox"></input>
      <label htmlFor="hamburger" className="hamburger-label" role="button" aria-labelledby="menu">&#xf0c9;</label>
      
      <div role="navigation" className="sidebar">
        <ul className="places"> 
          {this.state.venues.map((venue, idx) => {
            return <li key={idx} 
                       onClick={()=>this.listItemClick(venue)}>
                <img src={
                  venue.categories[0].icon.prefix + "32" + 
                  venue.categories[0].icon.suffix
                } alt="Venue category icon"/>
                {venue.name}
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
          center={this.state.center}>
          {this.state.markers.map((marker,idx) => ( 
            <Marker 
              key={idx}
              onClick={this.onMarkerClick}
              title={marker.title}
              name={marker.name}
              position = {
                {
                  lat: marker.location.lat,
                  lng: marker.location.lng
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
