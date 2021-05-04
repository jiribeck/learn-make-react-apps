import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfileForm from './01-ProfileForm';
import SocialForm from './02-SocialForm';
import Review from './03-Review';
import StepLinks from './StepLinks';

export default function SignupForm() {
  return (
    <div id="signup-form" className="signup-form">
      {/* show steps and links */}
      <StepLinks />

      {/* show the forms */}
      <Switch>
        <Route path="/" exact component={ProfileForm} />
        <Route path="/social" component={SocialForm} />
        <Route path="/review" component={Review} />
      </Switch>
    </div>
  );
}
