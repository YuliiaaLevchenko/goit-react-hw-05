import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../Api/moviesDataBaseApi";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actors, setActors] = useState([]);
    const { movieId } = useParams();
  
    useEffect(() => {
        async function getMovie() {
          try {
            setError(null);
            setIsLoading(true);
            const data = await fetchMovieCredits(movieId);
            setActors(data);
          } catch (error) {
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
        getMovie();
      }, [movieId]);

    return (
        <>
         {<div className={css.container}>{isLoading && <Loader />}</div>}
      {error && <p>Something wrong...</p>}
      {actors.length === 0 && !isLoading && !error && (
        <p>No information available about the movie cast.</p>
      )}
        </>
    );
}

export default MovieCast





