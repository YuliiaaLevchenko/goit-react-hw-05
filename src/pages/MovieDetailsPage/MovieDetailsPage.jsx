import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieById } from '../../movies-api';
import { NavLink } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const linkIsActive = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

const MovieDetailsPage = () => {
    const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

    return (
<div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <Link className={css.buttonLink} to={backLinkRef.current}>
        Go back
      </Link>
      {movie && (
        <div className={css.box}>
          <img
            className={css.img}
            src={
              movie.poster_path
                ? 'https://image.tmdb.org/t/p/w300' + movie.poster_path
                : 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'
            }
            width="350"
            alt="movie.title"
          />

          <div>
            <h2 className={css.text}>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
            <h3 className={css.text}>Overview</h3>
            <p className={css.text}>{movie.overview}</p>
            <h3 className={css.text}>Genres</h3>
            <div className={css.list}>
              {movie.genres.map(el => el.name).join(' ')}
            </div>
          </div>
        </div>
      )}
      <hr className={css.text}></hr>
      <p className={css.text}>Additional information</p>
      <ul>
        <li>
          <NavLink to="credits" className={linkIsActive}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={linkIsActive}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr className={css.text}></hr>
      <Outlet />
    </div>
    );
}

export default MovieDetailsPage



  

 