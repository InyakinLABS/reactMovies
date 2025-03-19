import React, { Component } from 'react'
import { Pagination } from 'antd'

import SingleCard from '../card/card'
import Loader from '../loader/loader'
import Error from '../errorHandler/errorHandler'

export default class CardList extends Component {
  render() {
    const { movies, isLoading, error, currentPage, totalResults, onPageChange, rateMovie } = this.props

    if (error) {
      return <Error error={error} />
    }

    if (isLoading) {
      return <Loader />
    }

    return (
      <div>
        <ul className="card-list">
          {movies && movies.length > 0 ? (
            movies.map((movie) => <SingleCard key={movie.id} rateMovie={rateMovie} movie={movie} />)
          ) : (
            <p>No movies available</p>
          )}
        </ul>

        <Pagination
          current={currentPage}
          pageSize={20} // Количество фильмов на странице
          total={totalResults}
          onChange={onPageChange}
          showSizeChanger={false}
          className="pagination"
          align="center"
        />
      </div>
    )
  }
}
