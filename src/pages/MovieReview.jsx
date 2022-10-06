import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { getReviews } from '../services/api';

export default function MovieReview() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  // const movieId = 723419;

  useEffect(() => {
    const getCast = async () => {
      const { results } = await getReviews(movieId);
      setReviews(results);
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p>{author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}

