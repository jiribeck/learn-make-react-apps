import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/about" exact={true}>
        <About />
      </Route>
      <Route path="/features" exact={true}>
        <Features />
      </Route>
      {/* Best Practice udržet "/" Route až dole, protože router prochází všechny Route, takže main page resp. / se může někde omylem připlést */}
      <Route path="/" exact={true}>
        <Home />
      </Route>
    </Switch>
  );
}
