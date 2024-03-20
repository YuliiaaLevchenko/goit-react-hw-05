import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCast } from "../../movies-api";
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
            const data = await getCast(movieId);
            setActors(data);
          } catch (error) {
            setError("Please try again later.");
          } finally {
            setIsLoading(false);
          }
        }
        getMovie();
      }, [movieId]);

    return (
        <>
         <div className={css.container}>{isLoading && <Loader />}
      {error && <p>Something wrong...</p>}
      {actors.length > 0 && (
      <ul className={css.list}>
          {actors.map(({ id, name, character }) => (
            <li className={css.item} key={id}>
              <div className="thumb">
                <p className={css.text}>
                  {name ? name : 'information is absent'}
                </p>
                <p className={css.text}>
                  Character: {character ? character : 'information is absent'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
        </>
    );
}

export default MovieCast





