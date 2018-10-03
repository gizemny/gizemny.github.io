import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// https://github.com/fullstackreact/google-maps-react
export class MapContainer extends Component {
  
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    zoom: 13,
    center: {
      lat: 30.2672,
      lng: -97.7431
    }
  };

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

  render(props) {
    console.log(this.props.items)
    return (
      <div>
        <Map google={this.props.google}
             onClick={this.onMapClicked}
             initialCenter={this.state.center}
             zoom={this.state.zoom}
             center={this.state.center} >
          <Marker onClick={this.onMarkerClick}
                  title={'The marker`s title will appear as a tooltip.'}
                  name={'Austin'}
                  position={{lat: 30.2672, lng: -97.7431}} />
          {/* {items.map((item, i) => (
          <Marker onClick={this.onMarkerClick}
                  title={this.props.items[item].name}
                  name={'Austin'}
                  position = {
                    {
                      lat: this.props.items[item].location.lat,
                      lng: this.props.items[item].location.lng
                    }
                  }
                  />
          ))}  */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDaDo_jIBREgK5TKMwSEwrSfJa1mJLebgw')
})(MapContainer)


// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 30.2672,
//       lng: -97.7431
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyDaDo_jIBREgK5TKMwSEwrSfJa1mJLebgw' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//         {
//           this.props.items.map((item) => {
//             return <AnyReactComponent
//             name={item.name}
//             lat={59.955413}
//             lng={30.337844}
//             // text={'Kreyser Avrora'}
//           />
//           })
//         } 
          
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;