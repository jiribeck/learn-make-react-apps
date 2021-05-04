import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import SignupForm from './components/SignupForm/00-SignupForm';

export default function App() {
  return (
    <Router>
      <div id="app" className="app">
        <SignupForm />
      </div>
    </Router>
  );
}
