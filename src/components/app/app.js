import React, { Component } from 'react'
import { debounce } from 'lodash'

import TabList from '../tabs/tabs'
import Search from '../search/search'
import '../../css/normalize.css'
import '../../css/app.css'
import MovieApi from '../Api/api'
import CardList from '../CardsList/card_list'
import { GenresProvider } from '../genres_context/genres'

export default class App extends Component {
  api = new MovieApi()

  state = {
    activeTab: '1',
    movies: [],
    isLoading: true,
    error: null,
    currentPage: 1,
    totalResults: 0,
    searchQuery: '',
    totalPages: 0,
    guestToken: {},
  }

  componentDidMount() {
    this.fetchData(this.state.activeTab, this.state.currentPage, this.state.searchQuery)
    if (!localStorage.getItem('session')) {
      this.setSession()
    }
  }
  setSession = async () => {
    try {
      const session = await this.api.createGuestSession()
      localStorage.setItem(
        'session',
        JSON.stringify({ guestToken: session.guest_session_id, expires: session.expires_at })
      )
    } catch (error) {
      console.error('Failed to create guest session:', error)
      this.setState({ error: error.message, isLoading: false })
    }
  }

  fetchData = async (activeTab, page, query = '') => {
    try {
      this.setState({ isLoading: true, error: null })

      let data
      if (activeTab === '1') {
        data = await this.api.fetchAllMovies(page, query)
      } else if (activeTab === '2') {
        data = await this.getRatedList(page)
      }

      this.setState({
        movies: data.results,
        isLoading: false,
        currentPage: page,
        totalResults: data.total_results,
      })
    } catch (error) {
      console.error('Failed to fetch movies:', error)
      this.setState({ error: error.message, isLoading: false })
    }
  }

  handleTabChange = (key) => {
    this.setState({ activeTab: key, currentPage: 1 }, () => {
      this.fetchData(key, 1, this.state.searchQuery)
    })
  }

  handleSearch = debounce((query) => {
    this.setState({ searchQuery: query }, () => {
      this.fetchData(this.state.activeTab, 1, query)
    })
  }, 500)

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchData(this.state.activeTab, page, this.state.searchQuery)
    })
  }

  rateMovie = async (rating, id) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'))

      const sessID = session.guestToken
      const response = await this.api.rateMovie(id, sessID, rating)
      return response
    } catch (error) {
      console.error('Ошибка при оценке фильма:', error.message)
    }
  }

  getRatedList = async (page) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'))
      const expires = new Date(session.expires)
      const now = new Date()
      if (now > expires) {
        throw new Error('Срок действия токена истек')
      }
      const data = await this.api.showRatedList(session.guestToken)
      return data
    } catch (error) {
      console.error('Ошибка при оценке фильма:', error.message)

      if (error.message === 'Срок действия токена истек') {
        await this.setSession()
        this.getRatedList(page)
      }
    }
  }

  render() {
    const { activeTab, movies, isLoading, error, currentPage, totalResults } = this.state
    return (
      <GenresProvider>
        <div className="moviesApp">
          {}
          <TabList activeTab={activeTab} onChange={this.handleTabChange} />

          {}
          {activeTab === '1' && (
            <>
              <Search onSearch={this.handleSearch} />
              <CardList
                rateMovie={this.rateMovie}
                movies={movies}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={this.handlePageChange}
              />
            </>
          )}

          {}
          {activeTab === '2' && (
            <CardList
              rateMovie={this.rateMovie}
              movies={movies}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={this.handlePageChange}
            />
          )}
        </div>
      </GenresProvider>
    )
  }
}
