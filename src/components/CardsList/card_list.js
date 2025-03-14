import React, { Component } from "react";
import SingleCard from "../card/card";
import MovieApi from "../Api/api";

export default class CardList extends Component {
    api = new MovieApi();

    state = {
        movies: [],
        isLoading: true,
        error: null,
        genres:[],
    };

    async componentDidMount() {
        await this.getData();
    }

    getData = async () => {
        try {
            const data = await this.api.fetchAllMovies();
            const genreData=await this.api.fetchGenres();
           // Установка данных
            this.setState({ movies: data.results, genres:genreData.genres, isLoading: false});
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            this.setState({ error: error.message, isLoading: false });
        }
    };

    render() {
        const { movies,genres, isLoading, error } = this.state;
        console.log("Movies in state:", movies);
        console.log("Movies in state:", genres);
       // Проверка состояния

        if (error) {
            return <p>Error: {error}</p>;
        }

        if (isLoading) {
            return <p>Loading movies...</p>;
        }

        return (
          <ul className="card-list">
          {movies && movies.length > 0 ? (
              movies.slice(0, 6).map((movie) => ( // Рендерим первые 6 фильмов
                  <SingleCard key={movie.id} movie={movie} />
              ))
          ) : (
              <p>No movies available</p>
          )}
      </ul>
        );
    }
  }