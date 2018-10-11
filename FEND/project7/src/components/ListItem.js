import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <li 
        className='listItem' 
        onClick={()=> this.props.onListItemClick(this.props)}>
        <img 
          src={
           this.props.categories[0].icon.prefix + "32" + 
           this.props.categories[0].icon.suffix
           } 
          alt="Venue category icon"/>
      {this.props.name}
      {/* <img alt="venue" src={`${this.props.bestPhoto.prefix}200x200${this.props.bestPhoto.suffix}`}/> */}
      </li>
    );
  }
}