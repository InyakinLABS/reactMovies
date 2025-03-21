export default class MovieApi {
  // Опции запроса
  get_options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I1YTY0YjQ4NWZhMDVkNWQ2YTQwN2E4Nzc5ZTdjNCIsIm5iZiI6MTc0MTcwODYyOS43NjgsInN1YiI6IjY3ZDA1ZDU1ZDRmNzQxMzczMjYwNmI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMyNlQt7IVFJJD7R514I4ET0sfj6ztPzplE-uVDiqnI',
    },
  }

  async fetchGenres() {
    try {
      // Выполняем запрос с использованием this.get_options
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.get_options)

      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }

  async fetchPopular(page = 1) {
    try {
      // Проверяем, что номер страницы находится в допустимом диапазоне
      if (page < 1 || page > 500) {
        throw new Error('Page number must be between 1 and 500')
      }

      // Выполняем запрос с использованием this.get_options
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
        this.get_options
      )

      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }
  // Асинхронный метод для получения фильмов
  async fetchAllMovies(page = 1, query = 'lala') {
    try {
      // Выполняем запрос с использованием this.get_options
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&sort_by=vote_average.desc`,
        this.get_options
      )

      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }

  async createGuestSession() {
    try {
      // Выполняем запрос с использованием this.get_options
      const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', this.get_options)
      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }

  async rateMovie(movieID, sessionID, rating) {
    let rate_options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I1YTY0YjQ4NWZhMDVkNWQ2YTQwN2E4Nzc5ZTdjNCIsIm5iZiI6MTc0MTcwODYyOS43NjgsInN1YiI6IjY3ZDA1ZDU1ZDRmNzQxMzczMjYwNmI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMyNlQt7IVFJJD7R514I4ET0sfj6ztPzplE-uVDiqnI',
      },
      body: `{"value":${rating}}`,
    }
    try {
      // Выполняем запрос с использованием this.get_options
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${sessionID}`,
        rate_options
      )
      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }

  async showRatedList(guestID, page = 1) {
    try {
      // Выполняем запрос с использованием this.get_options
      const response = await fetch(
        `https://api.themoviedb.org/3/guest_session/${guestID}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
        this.get_options
      )
      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Парсим ответ в JSON
      const data = await response.json()

      // Возвращаем данные
      return data
    } catch (error) {
      // Ловим и логируем ошибки
      console.error('Error fetching movies:', error)
      throw error // Пробрасываем ошибку дальше, если нужно
    }
  }
}
