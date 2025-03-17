import React, { Component } from "react";
import TabList from '../tabs/tabs';
import Search from "../search/search";
import '../../css/normalize.css';
import '../../css/app.css';
import MovieApi from "../Api/api";
import CardList from "../CardsList/card_list";
import { debounce } from "lodash";

export default class App extends Component {
  api = new MovieApi();

  state = {
    activeTab: '1', // По умолчанию активна вкладка Search
    movies: [],      // Список фильмов
    isLoading: true, // Состояние загрузки
    error: null,     // Ошибка
    currentPage: 1,  // Текущая страница
    totalResults: 0, // Общее количество фильмов
    searchQuery: '', // Поисковый запрос
    totalPages:0,
  };

  componentDidMount() {
    this.fetchData(this.state.activeTab, this.state.currentPage, this.state.searchQuery);
  }

  // Загрузка данных в зависимости от активной вкладки
  fetchData = async (activeTab, page, query = '') => {
    try {
      this.setState({ isLoading: true, error: null });
      
      let data;
      if (activeTab === '1') {
        // Загрузка данных для вкладки Search
        data = await this.api.fetchAllMovies(page, query);
       
      } else if (activeTab === '2') {
        // Загрузка популярных фильмов для вкладки Rated
        data = await this.api.fetchPopular(page);
        
      }
      
      this.setState({
        movies: data.results,
        isLoading: false,
        currentPage: page,
        totalResults: data.total_results,
      });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      this.setState({ error: error.message, isLoading: false });
    }
  };

  // Обработчик изменения вкладки
  handleTabChange = (key) => {
    this.setState({ activeTab: key, currentPage: 1 }, () => {
      this.fetchData(key, 1, this.state.searchQuery);
    });
  };

  // Обработчик поиска
  handleSearch = debounce((query) => {
    this.setState({ searchQuery: query }, () => {
      this.fetchData(this.state.activeTab, 1, query);
    });
  },500);

  // Обработчик пагинации
  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchData(this.state.activeTab, page, this.state.searchQuery);
    });
  };

  render() {
    const { activeTab, movies, isLoading, error, currentPage, totalResults } = this.state;
    console.log();

    return (
      <div className="moviesApp">
        {/* Передаем активную вкладку и обработчик изменения вкладки в TabList */}
        <TabList activeTab={activeTab} onChange={this.handleTabChange} />

        {/* Рендерим Search и CardList для вкладки Search */}
        {activeTab === '1' && (
          <>
            <Search onSearch={this.handleSearch} />
            <CardList
              movies={movies}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={this.handlePageChange}
             
            />
          </>
        )}

        {/* Рендерим только CardList для вкладки Rated */}
        {activeTab === '2' && (
          <CardList
            movies={movies}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            totalResults={totalResults}
            onPageChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}