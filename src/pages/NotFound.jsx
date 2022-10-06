import { useNavigate } from 'react-router-dom';
import { cssTransition } from 'react-toastify';
import css from '/NotFound.module.css'

export default function NotFound() {
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