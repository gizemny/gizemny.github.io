import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import MapStyle from './MapStyle';
// import activePin from './activePin.png';

// https://tomchentw.github.io/react-google-maps/
const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      defaultZoom={8} 
      zoom={props.zoom} 
      defaultCenter={{ lat: -34.397, lng: 150.644 }} 
      defaultOptions={{ styles: MapStyle }}
      center={{
        lat: parseFloat(props.center.lat),
        lng: parseFloat(props.center.lng)
      }}
      role="application"
      aria-label="map"
      tabIndex="-1"
      onClick={() => props.onMapClick()}>

      {props.markers && 
        props.markers.filter(marker => marker.isVisible).map((marker, idx) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
          const address = `${venueInfo.canonicalUrl}`;
          let restaurantImg = venueInfo.bestPhoto ? 
            `${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`
           : '';
          return (
            <Marker 
              key={idx} 
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.onMarkerClick(marker)}
              animation={marker.markerAnimate === true ? 1 : null}
              // icon= {marker.icon}
              tabIndex="0">
            {marker.showingInfoWindow && 
              venueInfo.bestPhoto && (
              <InfoWindow>
                {/* Use fragment to house children without adding extra nodes*/}
                <React.Fragment>
                  <h3>{venueInfo.name}</h3>
                  <img alt="venue" src={restaurantImg}/>
                  <p>{venueInfo.likes.count} people liked this place</p>
                  <p><a href={address} target="_blank" aria-label="View on Foursquare" rel="noopener noreferrer">View on Foursquare</a></p>
                </React.Fragment>
              </InfoWindow>
            )}    
            </Marker>
          )
        })
      }
    </GoogleMap>
  ))
)

export default class Map extends Component {
  render() {
    return (
      <MapComponent
      {...this.props}
        isMarkerShown
        googleMapURL= {`${process.env.REACT_APP_GOOGLE_MAP_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

