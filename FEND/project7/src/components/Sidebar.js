import React, { Component } from 'react';
import VenueList from './VenueList';
import { stack as Menu } from 'react-burger-menu'


export default class Sidebar extends Component {
  constructor() {
    super();
    // this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      query: '',
      venues: []
      // cursor: 0,
      // result: []
    };
  }
 
  // handleKeyDown(e) {
  //   const { cursor, result } = this.state;
  //   // arrow up/down button should select next/previous list element
  //   if (e.keyCode === 38 && cursor > 0) {
  //     this.setState( prevState => ({
  //       cursor: prevState.cursor - 1
  //     }))
  //   } else if (e.keyCode === 40 && cursor < result.length - 1) {
  //     this.setState( prevState => ({
  //       cursor: prevState.cursor + 1
  //     }))
  //   }
  //   console.log(cursor, result)
  // }

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
  // if user enters anything into query, find the venues that match query; else return al venues.
  filterVenues = () => {
    if (this.state.query.trim() !== '') {      
      const venues = this.props.venues.filter(venue => 
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
        return venues
      }
    return this.props.venues;
  };

  //Helper function; generic handleChange 
  handleChange = (e) => {
    const {venues, markers} = this.props;
    this.setState({query: e.target.value});
    if (e.target.value === '') {
      console.log('search for restaurant');
    }
    // if venue matches the query, make the corresponding marker visible
    const matchingMarkers = venues.map(venue => {
      const isMatched = venue.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
      const marker = markers.find(marker => marker.id === venue.id);
      isMatched ? marker.isVisible = true : marker.isVisible = false;
      return marker;
    });
    this.props.updateVisible(matchingMarkers);
  };

  render() {
    return (
      <Menu>
        <h2 className="title">All the Ramen</h2>
        <input 
          // onKeyDown={ this.handleKeyDown }
          type={'search'} 
          aria-label="Search for restaurant name"
          id={'search'} 
          role="searchbox"
          placeholder={'Filter restaurants'}
          onChange={this.handleChange}/>
        <VenueList
          aria-label="Venue List"
          {...this.props} 
          venues={this.filterVenues()}
          onListItemClick={this.props.onListItemClick}/>
      </Menu>
    );
  }
}
