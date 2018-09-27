import React, { Component } from 'react';
import Shelf from './Shelf'

class MainPage extends Component {
	render() {
		const {books, moveShelf} = this.props;
		
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<Shelf 
						books={books}
						moveShelf={moveShelf}  />
				</div>
			</div>
		);
	}
}

export default MainPage;