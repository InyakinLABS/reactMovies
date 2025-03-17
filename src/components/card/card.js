import React from 'react';
import { Image, Rate } from 'antd';
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";


// Выносим функцию для обрезки текста в отдельную утилиту
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  let truncatedText = text.substr(0, maxLength);
  truncatedText = truncatedText.substr(0, truncatedText.lastIndexOf(' '));
  return truncatedText + '...';
};

// Выносим компонент рейтинга в отдельный компонент
const Rating = () => <Rate className="star"  allowHalf count={10} defaultValue={0} />;

// Выносим компонент изображения в отдельный компонент
const MovieImage = ({ posterPath }) => (
  <Image
    width={200}
    src={`https://image.tmdb.org/t/p/original/${posterPath}`}
    className="movie-card__image"
  />
);

// Основной компонент
const SingleCard = ({ movie }) => {

  const { poster_path, title, vote_average, release_date, overview } = movie;

  const newText = truncateText(overview, 150);
  const movieDate = release_date ? format(parseISO(release_date), "MMMM d, yyyy", { locale: enUS }) : 'No date';

  return (
    <article className="movie-card">
      <MovieImage posterPath={poster_path} />

      <div className="movie-card__content">
        <header className="movie-card__header">
          <h2 className="movie-card__title">{title}</h2>
          <span className="movie-card__rating">
            {Math.round(vote_average * 10) / 10}
          </span>
        </header>

        <section className="movie-card__description">
          <div className="movie-card__date">{movieDate}</div>

          <div className="movie-card__genres">
            <button className="movie-card__genre first">Action</button>
            <button className="movie-card__genre">Drama</button>
          </div>

          <div className="movie-card__text">
            <p className="movie-card__overview">{newText}</p>
          </div>

          <div className="movie-card__rating-wrapper">
            <Rating className="movie-card__rating-stars" aria-label="Movie rating" />
          </div>
        </section>
      </div>
    </article>
  );
};

export default SingleCard;