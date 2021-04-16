import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

import { useAuth0 } from './contexts/auth0-context';

// dev-vsxtpuen.eu.auth0.com
// 7gqs5OwFycV4NL44gPPlypxwX89a7aCU

export default function App() {
  const { isAuthenticated, user, getToken, setToken } = useAuth0();
  const getUserData = useCallback(async () => {
    if (isAuthenticated && user) {
      const token = await getToken();
      setToken(token);
      console.log('user token:', token);
    }
  }, [isAuthenticated, setToken, getToken, user]);

  useEffect(() => {
    getUserData();
  }, [user, isAuthenticated, getUserData]);

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
