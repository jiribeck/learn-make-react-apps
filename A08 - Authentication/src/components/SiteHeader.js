import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth0 } from '../contexts/auth0-context';

export default function SiteHeader() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth0();

  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {/* stuff on the right */}
      <div>
        {!isLoading && !isAuthenticated && !user && (
          <button onClick={login}>Login</button>
        )}
        {!isLoading && isAuthenticated && user && (
          <>
            <button>{user.name}</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
