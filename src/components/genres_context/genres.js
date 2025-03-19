import React, { Component } from 'react'

import MovieApi from '../Api/api' // Импортируем API

const GenresContext = React.createContext()

export class GenresProvider extends Component {
  api = new MovieApi()

  state = {
    genres: [], // Состояние для хранения жанров
    isLoading: true, // Состояние загрузки
    error: null, // Ошибка
  }

  // Загрузка жанров
  loadGenres = async () => {
    try {
      const data = await this.api.fetchGenres()
      this.setState({ genres: data.genres, isLoading: false })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  // Получение названий жанров по их ID
  getGenreNames = (genreIds) => {
    const { genres } = this.state
    return genreIds.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean) // Убираем undefined, если жанр не найден
  }

  componentDidMount() {
    this.loadGenres() // Загружаем жанры при монтировании
  }

  render() {
    const { genres, isLoading, error } = this.state

    // Передаем данные и методы через контекст
    return (
      <GenresContext.Provider
        value={{
          genres,
          isLoading,
          error,
          getGenreNames: this.getGenreNames,
        }}
      >
        {this.props.children}
      </GenresContext.Provider>
    )
  }
}

export default GenresContext
