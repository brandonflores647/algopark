import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import classes from './auth.module.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.formWrapper}>
      <div className={classes.signupFormContainer}>
        <form onSubmit={onSignUp}>
          <span className={classes.formTitle}>Sign up for your account</span>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            className={classes.inputField}
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
          <input
            className={classes.inputField}
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
          <input
            className={classes.inputField}
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
          <input
            className={classes.inputField}
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <button type='submit' className={classes.formButton}>Sign Up</button>
          <span className={classes.haveAccount}>
            <NavLink to='/login'>
              Already have an account? Log in
            </NavLink>
          </span>
        </form>
        <img className={classes.gridTop} src='/static/grid.svg' alt='grid' width={'400px'}/>
        <img className={classes.gridBottom} src='/static/grid.svg' alt='grid' width={'400px'}/>
      </div>
    </div>
  );
};

export default SignUpForm;
