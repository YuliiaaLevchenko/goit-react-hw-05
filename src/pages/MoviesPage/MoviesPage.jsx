import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesSearch } from "../../movies-api";
import MoviesList from "../../components/MovieList/MovieList";
import MoviesFilter from "../../components/MoviesFilter/MoviesFilter";
import css from './MoviesPage.module.css'

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [params] = useSearchParams();
    const moviesFilter = params.get('query') ?? '';

    useEffect(() => {
        async function getData() {
          try {
            setIsLoading(true);
            const data = await getMoviesSearch(moviesFilter);
            setMovies(data);
          } catch (error) {
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
        getData();
      }, [moviesFilter]);
  
      const filteredMovies = useMemo(() => {
        return movies.filter(movie =>
          movie.title.toLowerCase().includes(moviesFilter.toLowerCase()),
        );
      }, [moviesFilter, movies]);

    return (
        <div className={css.container}>
      <h1>Movies</h1>
      <MoviesFilter />
      {isLoading && <b>Loading payments...</b>}
      {error && <b>HTTP error!</b>}
      <MoviesList movies={filteredMovies} />
    </div>
    );
}

export default MoviesPage