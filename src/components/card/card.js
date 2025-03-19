import React, { Component } from 'react'
import { Image, Rate } from 'antd'
import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'

import GenresContext from '../genres_context/genres'

// Выносим функцию для обрезки текста в отдельную утилиту
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  let truncatedText = text.substr(0, maxLength)
  truncatedText = truncatedText.substr(0, truncatedText.lastIndexOf(' '))
  return truncatedText + '...'
}

const getRatingColor = (vote) => {
  const rating = Math.round(vote)
  if (rating >= 0 && rating < 3) return '#E90000'
  if (rating >= 3 && rating < 5) return '#E97E00'
  if (rating >= 5 && rating < 7) return '#E9D100'
  if (rating >= 7) return '#66E900'
  return '#000000' // Цвет по умолчанию (если оценка не входит в диапазон)
}
// Выносим компонент рейтинга в отдельный компонент

// Выносим компонент изображения в отдельный компонент
const MovieImage = ({ posterPath }) => (
  <Image width={200} src={`https://image.tmdb.org/t/p/original/${posterPath}`} className="movie-card__image" />
)

// Основной компонент
class SingleCard extends Component {
  static contextType = GenresContext

  render() {
    const { getGenreNames } = this.context
    const { movie, rateMovie } = this.props
    const { poster_path, title, vote_average, rating, release_date, overview, id, genre_ids } = movie
    const newText = truncateText(overview, 150)
    const movieDate = release_date ? format(parseISO(release_date), 'MMMM d, yyyy', { locale: enUS }) : 'No date'
    const color = getRatingColor(vote_average)
    return (
      <article className="movie-card">
        <MovieImage posterPath={poster_path} />

        <div className="movie-card__content">
          <header className="movie-card__header">
            <h2 className="movie-card__title">{title}</h2>
            <span className="movie-card__rating" style={{ border: `2px solid ${color}` }}>
              {Math.round(vote_average * 10) / 10}
            </span>
          </header>

          <section className="movie-card__description">
            <div className="movie-card__date">{movieDate}</div>
            <div className="movie-card__genres">
              {getGenreNames(genre_ids)
                .map((item) => {
                  return (
                    <button key={movie.id + Math.random() * 10} className="movie-card__button">
                      {item}
                    </button>
                  )
                })
                .slice(0, 3)}
            </div>

            <div className="movie-card__text">
              <p className="movie-card__overview">{newText}</p>
            </div>
            <div className="movie-card__rating-wrapper">
              <Rate
                className="star"
                allowHalf
                count={10}
                defaultValue={rating}
                starSize={'10px'}
                onChange={(e) => {
                  rateMovie(e, id)
                }}
              />
            </div>
          </section>
        </div>
      </article>
    )
  }
}

export default SingleCard
