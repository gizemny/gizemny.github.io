import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
	state = {
		query: '',
		searchedBooks: [],
	}

	updateQuery = (query) => {
		this.setState({ 
			query: query 
		});
		this.updateSearchedBooks(query)
	}

	updateSearchedBooks = (query) => {	
		(!query)
			? this.setState({searchedBooks: [] })
			: BooksAPI.search(query).then((searchedBooks) => {
				(searchedBooks.error)
			? this.setState({searchedBooks:[]})
			: this.setState({searchedBooks: searchedBooks})
		});
	}
	
	render(){
		// destructure repeating code
		const {query, searchedBooks} = this.state;
		const {books, updateShelf} = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author"
							value={query} 
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{(searchedBooks.length===0) ? (
						<p>No results</p>
						) : (
						<ol className="books-grid">
							{searchedBooks.map(searchedBook => {
								let shelf = 'none'
								books.map(book => (
									book.id === searchedBook.id ?
									shelf = book.shelf 
									: ' ' 
								))
								return (
									<li key={searchedBook.id}>
										<Book 
											book={searchedBook}
											updateShelf={updateShelf}
											currentShelf={shelf}
										/>
									</li>
								)}
							)}
						</ol>
					)}
				</div>
			</div>
		);
	}
}

export default SearchPage;