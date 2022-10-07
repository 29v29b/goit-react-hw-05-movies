import { useNavigate } from 'react-router-dom';
import css from './MovieDetails.module.css'

function NotFound() {
  const history = useNavigate();

  const onReturn = () => {
    history('/');
  };
  return (
    <>
      <h2>404 Not Found </h2>
      <button type="button" onClick={onReturn} className={css.button}>
        Go home
      </button>
    </>
  );
}

export default NotFound;