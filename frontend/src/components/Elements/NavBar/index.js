import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';

import classes from './NavBar.module.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className={classes.navWrapper}>
      {!user ?
      <>
        <button>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </button>
        <button>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </button>
      </>
      : <LogoutButton />}
    </nav>
  );
}

export default NavBar;
