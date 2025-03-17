import React, { Component } from "react";
import SingleCard from "../card/card";
import Loader from "../loader/loader";
import Error from "../errorHandler/errorHandler";
import { Pagination } from "antd";

export default class CardList extends Component {
  render() {
    const { movies, isLoading, error, currentPage,totalResults, onPageChange } = this.props;
  
   
    let totalPages=totalResults>=500?3000:totalResults;

    if (error) {
      return <Error error={error} />;
    }

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <ul className="card-list">
          {movies && movies.length > 0 ? (
            movies.map((movie) => <SingleCard key={movie.id} movie={movie} />
            
        )
          ) : (
            <p>No movies available</p>
          )}
        </ul>
        
        <Pagination
          current={currentPage}
          pageSize={6} // Количество фильмов на странице
          total={totalPages}
          onChange={onPageChange}
          showSizeChanger={false}
          className="pagination"
          align="center"
        />
    </div>
    );
  }
}