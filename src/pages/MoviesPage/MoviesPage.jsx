import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesSearch } from "../../movies-api";
import MoviesList from "../../components/MovieList/MovieList";
import MoviesFilter from "../../components/MoviesFilter/MoviesFilter";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  
  const [searchParams] = useSearchParams();
  const moviesFilter = searchParams.get("query") ?? "";

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
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(moviesFilter.toLowerCase())
    );
  }, [moviesFilter, movies]);

  const handleFilterChange = (newQuery) => {
    searchParams.set("query", newQuery);
    searchParams.replace(searchParams.toString()); 
  };

  return (
    <div className={css.container}>
      <h1>Movies</h1>
      <MoviesFilter onFilterChange={handleFilterChange} />
      {isLoading && <b>Loading movies...</b>}
      {error && <b>HTTP error!</b>}
      <MoviesList movies={filteredMovies} />
      
    </div>
  );
};

export default MoviesPage;
