import React from 'react';
import { Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import MainPage from './components/MainPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //fetch data from api once elements render
  componentDidMount() {
    this.getMyBooks();
  }

  getMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  //update shelf after change & fetch again
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
     this.getMyBooks()
    })
  }

  render() {
    const {books} = this.state;
    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={() => (
            <MainPage 
              books={books}
              updateShelf={this.updateShelf}
            />
          )}
        />
        <Route 
          path="/search" 
          render={() => (
            <SearchPage 
              books={books}
              updateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
