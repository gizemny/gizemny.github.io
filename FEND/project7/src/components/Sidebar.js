import React, { Component } from 'react';
import VenueList from './VenueList';
import { slide as Menu } from 'react-burger-menu'

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      venues: []
    };
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
      // <div className='sideBar'>
      //   <input id="hamburger" type="checkbox" className="hamburgerCheckbox"></input>
      //   <label htmlFor="hamburger" className="hamburgerLabel" role="button" aria-labelledby="menu">&#xf0c9;</label>
      //   <input 
      //     type={'search'} 
      //     id={'search'} 
      //     placeholder={'Filter restaurants'}
      //     onChange={this.handleChange}/>
      //   <VenueList 
      //     {...this.props} 
      //     venues={this.filterVenues()}
      //     onListItemClick={this.props.onListItemClick}/>
      // </div>
      <Menu>
        <input 
          type={'search'} 
          id={'search'} 
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
