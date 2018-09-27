import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired,
  };

  render() {
    // destructure repeating code
    const {books, moveShelf} = this.props;
    const currentlyReadingShelf = books.filter(book => book.shelf === 'currentlyReading')
    const wantToReadShelf = books.filter(book => book.shelf === 'wantToRead')
    const readShelf = books.filter(book => book.shelf === 'read')

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {(currentlyReadingShelf.length===0) ? (
                <p>Add books that you're currently reading</p>
                ) : (
                currentlyReadingShelf.map(book => (
                  <li key={book.id}>
                    <Book 
                      book={book}
                      moveShelf={moveShelf}
                      currentShelf='currentlyReading'
                    />
                  </li>
                ))
                )}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {(wantToReadShelf.length === 0) ? (
                <p>Add books that you want to read</p>
                ) : (
                wantToReadShelf.map(book => (
                  <li key={book.id}>
                      <Book
                        book={book}
                        moveShelf={moveShelf}
                        currentShelf='wantToRead'
                      />
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {(readShelf.length === 0) ? (
                <p>Add books that you have already read</p>
                ) : (
                readShelf.map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      moveShelf={moveShelf}
                      currentShelf='read'
                    />
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Shelf;