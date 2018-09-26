import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


var foursquare = require('react-foursquare')({
  clientID: '',
  clientSecret: ''  
});

var params = {
  "ll": "37.7749,-122.4194",
  "query": 'Blue Bottle'
};

export default class FoursquareDemo extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: []
     };
   }

  componentDidMount() {    
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ items: res.response.venues });
      });
  }

  render() {
    return (
    <div>
        <div>Items:</div>
        { this.state.items.map(item=> { return <div key={item.id}>{item.name}</div>}) }
    </div>
  )
  }
}

ReactDOM.render(
  <FoursquareDemo />,
  document.getElementById('root')
);
