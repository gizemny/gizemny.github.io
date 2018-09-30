import React from 'react';

// functional stateless component
const Book = ( { book, currentShelf, moveShelf } ) => {
	// ternary to check if book has thumbnail img
	let bookThumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';
	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover" 
					style={{ 
						width: 128, 
						height: 193, 
						backgroundImage: `url(${bookThumbnail})` }}>
				</div>
				<div className="book-shelf-changer">
					<select onChange={ (event) => moveShelf(book, event.target.value)}
						value={currentShelf}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors}</div>
		</div>
	);
	
}

export default Book;