import css from './HomePage.module.css'
import { useEffect, useState } from 'react';
import { getMovies } from '../../movies-api';
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MovieList/MovieList";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
          try {
            setIsLoading(true);
            const data = await getMovies();
            setMovies(data.results);
          } catch (error) {
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
        getData();
      }, []);
    

    return (
        <>
        <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div className={css.container}>
        {movies.length > 0 && <MoviesList movies={movies} />}
      </div>
    </div>
    </>
    );
}

export default HomePage