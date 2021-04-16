import React from 'react';
import ReactDOM from 'react-dom';

import { Auth0Provider } from './contexts/auth0-context';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
