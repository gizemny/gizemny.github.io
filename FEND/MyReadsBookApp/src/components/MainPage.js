import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

// functional stateless component
const MainPage = ({books, updateShelf}) => {	
	// create an object containing shelves with a name and an empty array of books to be placed on each shelf
	const allShelves = {
		currentlyReading: {
		  name: 'Currently Reading',
		  books: []
		},
		wantToRead: {
		  name: 'Want to Read',
		  books: []
		},
		read: {
		  name: 'Read',
		  books: []
		}
	};

	//https://toddmotto.com/methods-to-determine-if-an-object-has-a-given-property/ iterate through books & use simple helper function to find any books that match a property in the object and 
	for (let matched of books) { 
		function hasProp(obj, prop) {
		  return Object.prototype.hasOwnProperty.call(obj, prop);
		}
		if (hasProp(allShelves, matched.shelf))
		// get shelf of matched book; place matched books in the corresponding shelf
			allShelves[matched.shelf].books.push(matched)
	};

	const eachShelf = Object.keys(allShelves).map((shelf, index) =>
		// map object to assign info about each shelf; each child in the iterator should have a unique "key"
		<Shelf 
			key={index}
			shelf={allShelves[shelf].name}
			books={allShelves[shelf].books}
			updateShelf={updateShelf} 
		/>
	);

	return (	
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				{ eachShelf }
			</div>
			<div className="open-search">
				<Link to='/search'>Add a book</Link>
			</div> 
		</div>
	);	
}

export default MainPage;