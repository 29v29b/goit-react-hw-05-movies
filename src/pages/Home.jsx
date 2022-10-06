import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../services/api';
import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await fetchTrendingMovies();

      setMovies(results);
    };

    getMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Tranding today</h1>
      <ul className={css.list}>
      {movies &&
        movies.map(
          ({id, title, }) => (            
              <li key={id} id={id}>
                <Link
                  to={{
                    pathname: `/movies/${`${id}`}`,
                    state: {
                      from: {
                        location,
                        label: 'Back to Home',
                      },
                    },
                  }}
                >
                  <p>{title}</p>
                </Link>
              </li>
            
          )
        )}
        </ul>
    </>
  );
};

export default Home;