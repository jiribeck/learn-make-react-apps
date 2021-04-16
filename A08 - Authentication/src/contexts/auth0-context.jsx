import React, { createContext, useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    initAuth0();

    async function initAuth0() {
      // Creating Auth0 client
      const auth0 = await createAuth0Client({
        domain: 'dev-vsxtpuen.eu.auth0.com',
        client_id: '7gqs5OwFycV4NL44gPPlypxwX89a7aCU',
        redirect_uri: window.location.origin,
      });

      setAuth0Client(auth0);

      //handle redirect when user come back
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        try {
          await auth0.handleRedirectCallback();
        } catch (err) {
          alert(err);
        }
        window.location.replace(window.location.pathname);
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }

      setIsLoading(false);
    }
  }, []);

  if (isLoading && !auth0Client) return <div>Loading....</div>;

  return (
    <Auth0Context.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        token,
        login: (...p) => auth0Client.loginWithRedirect(...p),
        logout: (...p) => auth0Client.logout(...p),
        getToken: (...p) => auth0Client.getTokenSilently(...p),
        setToken: (...p) => setToken(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
