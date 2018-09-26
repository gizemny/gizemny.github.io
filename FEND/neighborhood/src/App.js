import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import Map from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="wrapper">

      <input id="hamburger" type="checkbox" class="hamburger-checkbox"></input>
      <label for="hamburger" class="hamburger-label" role="button" aria-labelledby="menu">&#xf0c9;</label>
      
      <nav role="navigation" class="sidebar">
        <ul class="menu">
          <li>Home</li>
          <li>Publications</li>
          <li>Shop</li>
          <li>Your Account</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      <main role="main" class="content">
        <Map id="map" />
      </main>

    </div>

    
    );
  }
}

export default App;