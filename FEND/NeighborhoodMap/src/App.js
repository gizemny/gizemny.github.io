import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import FourSquare from './API/';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import Modal from 'react-modal';
Modal.setAppElement('body');
// import foursquare from 'react-foursquare';
// console.log(process.env.REACT_APP_WEATHER_API_KEY)

const params = {
  near: 'Austin, TX',
  query: 'ramen',
  limit: 10
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class App extends Component {
  // in order to get the current state of the component to update filtered results, use a function in state
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center:[],
      zoom: 12, 
      markerAnimate: false,
      modalIsOpen: true,
      updateVisible: obj => {
        this.setState(obj);
      }
    };
    //  this.openModal = this.openModal.bind(this);
    //  this.afterOpenModal = this.afterOpenModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  
  componentDidMount() {
    //fetch based on parameters & set results as states 
    FourSquare.search(params)
    .then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          showingInfoWindow: false,
          isVisible: true,
          id: venue.id
        }
      });
      this.setState({venues, center, markers})
    })
  }

  // map through markers and close infowindows
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.showingInfoWindow=false;
      marker.markerAnimate=false;
      return marker;
    });
    // create a copy of object to store updated values
    this.setState({markers: Object.assign(this.state.markers, markers)})
  };

  // when user clicks a venue on the list, find matching marker id 
  onListItemClick = venue => {
    const marker= this.state.markers.find(marker => marker.id === venue.id)
    this.onMarkerClick(marker)
    console.log(venue)
  }

  // show infowindow for the selected or matching marker
  onMarkerClick = marker => {
    this.closeMarkers();
    marker.showingInfoWindow = true;
    marker.markerAnimate = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id)  
    console.log(venue);
    console.log('This is ' + venue.name)
    // get details using foursquare api helper function
    FourSquare.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
    }).catch(error => {
      window.alert('Encountered an error while trying to fetch info for this venue: ' + error.message);
      console.log(error);
    });
  };
  
  onMapClick = () => {
    this.closeMarkers();
  };
  
  render() {
    return (
      <ErrorBoundary>
        <Modal
          appElement={document.getElementById('app')}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className="modalClose" onClick={this.closeModal}>close</button>
          <div className="modalText">
            {/* <h1 ref={subtitle => this.subtitle = subtitle}>Discover</h1> */}
            <h2>Discover Austin 's yummy <span role="img" aria-label="ramen">🍜</span> scene</h2>
          </div>
        </Modal>
        {/*get states using spread operator */}

        <div className="App">
          <Sidebar {...this.state} onListItemClick={this.onListItemClick}/>
          <Map className="main" {...this.state} 
               onMarkerClick={this.onMarkerClick}
               onMapClick={this.onMapClick}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
