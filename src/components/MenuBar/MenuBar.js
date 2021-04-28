import s from './MenuBar.module.css';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';

import { useSelector } from 'react-redux';

import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { authSelectors } from '../../redux/auth';

export default function MenuBar() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <header>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={s.Toolbar}>
          <Navigation />
          {isAuthenticated ? <UserMenu /> : <AuthNav />}
        </Toolbar>
      </AppBar>
    </header>
  );
}
