import React, { Component } from 'react';
import { Image } from 'antd';
import { parseISO, format } from "date-fns";
import { enUS} from "date-fns/locale";
import { Rate } from 'antd';


  





class SingleCard extends Component{


     

  
    render(){
        const {movie}=this.props
       const img=(
            <Image
              width={200}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="movie-card__image"
            />
          );
          const Rating= () => <Rate className='star' allowHalf count={10} defaultValue={Math.round(movie.vote_average*10)/10} />;
         
          const truncateText = (text, maxLength) => {
            if (text.length <= maxLength) return text; // Если текст уже короткий, возвращаем его
        
            // Обрезаем текст до maxLength, не обрезая слова на середине
            let truncatedText = text.substr(0, maxLength);
            truncatedText = truncatedText.substr(0, truncatedText.lastIndexOf(' ')); // Обрезаем до последнего пробела
            return truncatedText + '...'; // Добавляем многоточие
        };
        const newText= truncateText(movie.overview,150);

        const movieDate=format(parseISO(movie.release_date), "MMMM d, yyyy", {locale: enUS,})
    
      
    return(
        <article className="movie-card">
    {/* Изображение фильма */}
    {img}

    <div className="movie-card__content">
        {/* Заголовок карточки */}
        <header className="movie-card__header">
            <h2 className="movie-card__title">{movie.title}</h2>
            <span className="movie-card__rating">
                {Math.round(movie.vote_average * 10) / 10}
            </span>
        </header>

        {/* Описание карточки */}
        <section className="movie-card__description">
            {/* Дата выхода фильма */}
            <div className="movie-card__date">
                {movieDate ? movieDate : 'No date'}
            </div>

            {/* Жанры */}
            <div className="movie-card__genres">
                <button className="movie-card__genre first">Action</button>
                <button className="movie-card__genre">Drama</button>
            </div>

            {/* Описание фильма */}
            <div className="movie-card__text">
                <p className="movie-card__overview">{newText}</p>
            </div>

            {/* Рейтинг */}
            <div className="movie-card__rating-wrapper">
                <Rating className="movie-card__rating-stars" aria-label="Movie rating" />
            </div>
        </section>
    </div>
</article>
        )
    }
}
export default SingleCard