import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

// functional stateless component
const MainPage = ({books, moveShelf}) => {	
	//https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react
	// create an object and iterate to create each shelf via evaluation to find books that match
	const shelves = {
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

	for (let shelvedBook of books) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty iterate through each book and check if shelves and book has a property that matches. call() method accepts multiple arguments and assigns the value individually
		if (Object.prototype.hasOwnProperty.call(shelves, shelvedBook.shelf))
			shelves[shelvedBook.shelf].book.push(shelvedBook)
	};

	const eachShelf = Object.keys(shelves).map((shelf) =>
		// Each child in iterator should have a unique "key" prop https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js 
		<Shelf 
		key={shelf}
		shelf={shelves[shelf].name}
		books={shelves[shelf].book}
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