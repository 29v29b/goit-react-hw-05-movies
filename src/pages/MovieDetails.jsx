import Loader from 'components/Loader';
import { useState, useEffect, Suspense } from 'react';
import css from './MovieDetails.module.css'
import {
  useParams,
  useNavigate,
  useMatch,
  NavLink,
  useLocation,
  Link,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails, IMAGE_URL } from '../services/api';


// const MovieReview = lazy(() =>
//   import('./MovieReview')
// );
// const MovieCast = lazy(() =>
//   import('./MovieCast')
// );

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = useMatch("/movies/:movieId/*");
  var url = pathname.match(/^(\/movies\/\d+)/)[1];
  
  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieDetails(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);

  function historyBack() {
    history(-1);
  }

  return (
    <>
      {!movie ? (
        <div className={css.notFound}>Movie is not found</div>
      ) : (
        <>
          <button type="button" onClick={historyBack} className={css.button}>Go back</button>
          <div className={css.movieContainer}>
            <div className={css.movieImg}>
              <img
                src={
                  movie.poster_path
                    ? IMAGE_URL + movie.poster_path
                    : `https://bitsofco.de/content/images/2018/12/broken-1.png`
                }
                alt={movie.title}
                widht=""
                height=""
              />
            </div>

            <div>
              <h2>{movie.title}</h2>
              <p>User Score: {`${movie.vote_average * 10}`}%</p>
              <h3>Overview</h3>
              <p>{`${movie.overview}`}</p>
              <h3>Genres</h3>
              <p>{`${movie.genres.map(genre => genre.name).join(' / ')}`}</p>
            </div>
          </div>
        </>
      )}
      <hr />
      <p>Additional information</p>
      <nav>
        <NavLink
          to={{ pathname: `${url}/cast`  }}
          className={css.link}
          state={{location}} replace
        >
          Cast
        </NavLink>
        <NavLink
          to={{ pathname: `${url}/reviews`, }}
          className={css.link}
          state={{location}} replace
        >
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<Loader />}>

        <Link to="/movies/cast"></Link>
        <Link to="/movies/reviews"></Link>
        <Outlet />    
      
      </Suspense>
    </>
  );
}

export default MovieDetails;
