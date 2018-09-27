import React from 'react'
import { Route } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import MainPage from './components/MainPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // fetch data from api once elements render
  componentDidMount() {
    this.getMyBooks()
  }

  getMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //fetch from api after changing shelf
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.getMyBooks()
  }

  render() {
    const {books,shelf} = this.state;

    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={() => (
            <MainPage 
              books={books}
              shelf={shelf}
              moveShelf={this.moveShelf}
            />
          )}
        />
        <Route 
          path="/search" 
          render={() => (
            <SearchPage 
              books={books}
              moveShelf={this.moveShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
