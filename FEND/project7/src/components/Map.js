/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import MapStyle from './MapStyle';
// import activePin from './activePin.png';

// https://tomchentw.github.io/react-google-maps/
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      defaultZoom={8} 
      zoom={props.zoom} 
      defaultCenter={{ lat: -34.397, lng: 150.644 }} 
      defaultOptions={{ styles: MapStyle }}
      center={{
        lat: parseFloat(props.center.lat),
        lng: parseFloat(props.center.lng)
      }}>

      {props.markers && 
        props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);

          return (
              <Marker 
                key={idx} 
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.onMarkerClick(marker)}
                animation = {arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}>
              {marker.showingInfoWindow && 
                venueInfo.bestPhoto && (
                <InfoWindow>
                  {/* Use fragment to house children without adding extra nodes*/}
                  <>
                    <img alt="venue" src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}/>
                    <p>{venueInfo.name}</p>
                    <p>{venueInfo.likes.count} people liked this place</p>
                  </>
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
      <MyMapComponent
      {...this.props}
        isMarkerShown
        googleMapURL= 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDaDo_jIBREgK5TKMwSEwrSfJa1mJLebgw'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

