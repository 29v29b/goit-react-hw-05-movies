import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => (
  <nav>
    <NavLink to="/" className={css.link}>
      Home
    </NavLink>

    <NavLink to="/movies" className={css.link}>
      Movies
    </NavLink>
  </nav>
);

export default Header;