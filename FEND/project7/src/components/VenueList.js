import React, { Component } from 'react';
import ListItem from './ListItem';

export default class VenueList extends Component {
  
  render() {
   
    return (
      <ul className='venueList'>
        {this.props.venues &&
          this.props.venues.map((venue, idx)=>(
            <ListItem 
            key={idx} 
            // className={this.props.cursor === idx ? 'active' : null}
            {...venue} 
            onListItemClick={this.props.onListItemClick}/>
          ))
        }
      </ul>
    );
  }
}

