import { toast } from 'react-toastify';
import css from './Movie.module.css'
import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Movies = () => {
  const [movieToFind, setMovieToFind] = useState('');
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const searchString = new URLSearchParams(location.search).get('query');

    if (searchString) {
      const getMovies = async () => {
        const { results } = await searchMovies(searchString);

        setMovies(results);
        setMovieToFind(searchString);

        console.log(searchString);
      };

      getMovies();
    }
  }, [location.search]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (movieToFind.trim()) {
      const { results } = await searchMovies(movieToFind);

      setMovies(results);
      setMovieToFind('');

      if (results.length === 0) {
        toast.error('We did not found anything! Please change your request and try again');
      }

      history.push({
        ...location,
        search: `query=${movieToFind}`,
      });
    }
  };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            onChange={e => setMovieToFind(e.target.value)}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            value={movieToFind}
          />
          <button type="submit" className={css.searchFormButton}>
          &#128269;
          </button>
        </form>
      </header>
      {movies.length > 0 &&
        movies.map(({ id, title, poster_path }) => (
          <ul>
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${`${id}`}`,
                  state: {
                    from: {
                      location,
                    },
                  },
                }}
              >
                <p>{title}</p>
              </Link>
            </li>
          </ul>
        ))}
    </>
  );
};

export default Movies;