import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

import { Typography, CssBaseline } from '@material-ui/core';
import { Home } from '@material-ui/icons';

export default function Navigation() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <div className={s.Navigation}>
      <CssBaseline />
      <NavLink className={s.NavigationItem} exact to="/">
        <Home fontSize="large" style={{ color: 'white' }} />
      </NavLink>
      {isAuthenticated && (
        <Typography variant="h6">
          <NavLink className={s.NavigationItem} exact to="/contacts">
            Phonebook
          </NavLink>
        </Typography>
      )}
    </div>
  );
}
