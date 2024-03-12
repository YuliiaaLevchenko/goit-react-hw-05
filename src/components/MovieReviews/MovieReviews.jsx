import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews } from '../../movies-api';
import css from './MovieReviews.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      async function getData() {
        try {
          setIsLoading(true);
          const data = await getReviews(movieId);
          setReviews(data);
        } catch (error) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
      getData();
    }, [movieId]);
    return (
        <>
         {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3 className={css.text}>{author}</h3>
              <p className={css.text}>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!reviews.length && <p>We dont have any reviews for this movie</p>}
        </>
    );
}

export default MovieReviews





