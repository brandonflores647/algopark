import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authenticate } from './store/session';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Elements/NavBar';
import SplashPage from './components/Pages/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

import MapPage from './components/Pages/MapPage';
import SortingPage from './components/Pages/SortingPage';

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      if (!user) await dispatch(authenticate());
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className='contentWrap'>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/map' exact={true} >
          <MapPage />
        </ProtectedRoute>
        <ProtectedRoute path='/sorting' exact={true} >
          <SortingPage />
        </ProtectedRoute>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
