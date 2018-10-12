import React, { Component } from 'react';
import VenueList from './VenueList';
import { stack as Menu } from 'react-burger-menu'


export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      venues: []
    };
  }
  handleKeyDown(e) {
    const { cursor, result } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
  // if query is empty, show all, else return only the ones that match the query
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
    this.setState({query: e.target.value});
    if (e.target.value === '') {
      console.log('no results');
    }

    // if query matches a venue, show the corresponding marker
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      isMatched ? marker.isVisible = true : marker.isVisible = false;
      return marker;
    });
    this.props.updateFiltered({
      markers
    });
  };

  render() {
    return (
      <Menu>
        <h2 className="title">All the Ramen</h2>
        <input 
          type={'search'} 
          aria-label="search by restaurant name"
          id={'search'} 
          role="searchbox"
          placeholder={'Filter restaurants'}
          onChange={this.handleChange}/>
        <VenueList 
          {...this.props} 
          venues={this.filterVenues()}
          onListItemClick={this.props.onListItemClick}/>
      </Menu>
    );
  }
}
