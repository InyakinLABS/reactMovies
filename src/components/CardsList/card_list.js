import React, { Component} from "react";
import SingleCard from "../card/card";
import MovieApi from "../Api/api";
import Loader from "../loader/loader";
import Error from "../errorHandler/errorHandler";


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
            return <Error error={error}/>;
        }

        if (isLoading) {
            return <Loader/>;
        }

        return (
          <ul className="card-list">
          {movies && movies.length > 0 ? (
              movies.slice().map((movie) => ( // Рендерим первые 6 фильмов
                  <SingleCard key={movie.id} movie={movie} />
              ))
          ) : (
              <p>No movies available</p>
          )}
      </ul>
        );
    }
  }