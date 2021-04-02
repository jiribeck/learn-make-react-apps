import React from 'react';

import Tab from './Tab';

export default function Header(props) {
  return (
    <div className="tabs">
      <Tab label="Home" to="/" />
      <Tab label="About" to="/about" />
      <Tab label="Features" to="/features" />
    </div>
  );
}
