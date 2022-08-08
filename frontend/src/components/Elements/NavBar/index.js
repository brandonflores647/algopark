import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';

import classes from './NavBar.module.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className={classes.navWrapper}>
      <section className={classes.logoSection}>
      <div
            className={classes.blockContainer}
        >
            <div className={`${classes.blockTL} ${classes.block}`}></div>
            <div className={`${classes.blockTR} ${classes.block}`}></div>
            <div className={`${classes.blockBL} ${classes.block}`}></div>
            <div className={`${classes.blockBR} ${classes.block}`}></div>
        </div>
        <span className={classes.logoText}>AlgoPark</span>
      </section>
      <section className={classes.sessionSection}>
      {!user ?
      <>
        <button className={classes.navButton}>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </button>
        <button className={classes.navButton}>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </button>
      </>
      :
      <>
        <span className={classes.welcome}>Welcome {user.username}!</span>
        <LogoutButton />
      </>}
      </section>
    </nav>
  );
}

export default NavBar;
