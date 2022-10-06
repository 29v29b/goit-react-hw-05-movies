import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const history = useNavigate();

  const onGoBack = () => {
    history.push('/');
  };
  return (
    <>
      <h2>404 Not Found </h2>
      <button type="button" onClick={onGoBack}>
        Go home
      </button>
    </>
  );
}