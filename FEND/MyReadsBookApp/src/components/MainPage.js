import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

// functional stateless component
const MainPage = ({books, moveShelf}) => {	
	// create an object and iterate through books, render each shelf by using an evaluation to find and place books that match
	const allShelves = {
		currentlyReading: {
		  name: 'Currently Reading',
		  book: []
		},
		wantToRead: {
		  name: 'Want to Read',
		  book: []
		},
		read: {
		  name: 'Read',
		  book: []
		}
	};

	//https://toddmotto.com/methods-to-determine-if-an-object-has-a-given-property/
	for (let bookOnShelf of books) { 
		function hasProp(obj, prop) {
		  return Object.prototype.hasOwnProperty.call(obj, prop);
		}
		if (hasProp(allShelves, bookOnShelf.shelf))
			allShelves[bookOnShelf.shelf]
			.book.push(bookOnShelf)
	};

	//https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
	const eachShelf = Object.keys(allShelves).map((shelf) =>
		// Create new shelf array and place all books from the allShelves object into the corresponding shelf; each child in the iterator should have a unique "key" prop 
		<Shelf 
			key={shelf}
			shelf={allShelves[shelf].name}
			books={allShelves[shelf].book}
			moveShelf={moveShelf} 
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