import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader'
import Header from './components/Header'
import MovieCast from "pages/MovieCast";
import MovieReview from "pages/MovieReview";

const Home = lazy(() =>
  import('./pages/Home' )
);
const Movies = lazy(() =>
  import('./pages/Movies')
);
const MovieDetails = lazy(() =>
  import(
    './pages/MovieDetails' 
  )
);
// const NotFound = lazy(() =>
//   import('./pages/NotFound')
// );

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Home />}/>
          <Route exact path="/" element={<Home />} >
          </Route>

          <Route exact path="/movies" element={<Movies />}>
          </Route>

          <Route path="/movies/:movieId" element={<MovieDetails />}>

          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<MovieReview  />}></Route>

          </Route>

          <Route path="*" element={<Home />}>
          </Route>
          
        </Routes>
        <ToastContainer autoClose={2000} />
      </Suspense>
    </>
  );
}

export default App;
