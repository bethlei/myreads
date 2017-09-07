import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import { search } from './BooksAPI';

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    queryBooks: []
  }

  searchBooks(query) {
    this.setState({ query: query.trim() })

    search(query, 20).then((books) => {
      if (books) {
        this.setState({ queryBooks: books })
      } else {
        this.setState({ queryBooks: [] })
      }
    })
  }

  render() {
    const { query, queryBooks } = this.state
    const { shelves, onChangeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to ='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.searchBooks(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queryBooks && queryBooks.map(book => {
              const { id, authors, imageLinks, shelf, title } = book
              return (
                <li key={id}>
                  <Book
                    authors={authors}
                    id={id}
                    imageLinks={imageLinks}
                    title={title}
                    shelf={shelf}
                    shelves={shelves}
                    onChangeShelf={onChangeShelf}
                    />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;
