import React from 'react'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import MainPage from './MainPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  componentDidMount() {
    this.fetchBooks()
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.fetchBooks()
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={() => (
            <MainPage 
              books={this.state.books}
              moveShelf={this.moveShelf}
            />
          )}
        />
        <Route 
          path="/search" 
          render={() => (
            <SearchPage 
              books={this.state.books}
              moveShelf={this.moveShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
