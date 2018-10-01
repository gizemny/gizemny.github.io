import React from 'react';
import Book from './Book'

// functional stateless components
const Shelf = ({books, moveShelf, shelf}) => {	

  const individualBook = books.map(book => (
    <li key={book.id}>
      <Book 
        book={book}
        moveShelf={moveShelf}
        currentShelf={book.shelf}
      />
    </li>
  ));

  return (
    <div> 
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          {
            (books.length === 0) ? (
            <p> This book shelf is getting dusty. Why don't you search for some books to add here?
            </p>
            ) : (
            <ol className="books-grid">
              {individualBook}  
            </ol>
            )
          }
        </div>
      </div>
    </div> 
  );
};


export default Shelf;

