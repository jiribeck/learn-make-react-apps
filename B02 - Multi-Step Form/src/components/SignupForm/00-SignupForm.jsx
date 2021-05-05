import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { SignupFormProvider } from './SignupFormContext';

import ProfileForm from './01-ProfileForm';
import SocialForm from './02-SocialForm';
import Review from './03-Review';
import StepLinks from './StepLinks';

export default function SignupForm() {
  const location = useLocation();

  return (
    <SignupFormProvider>
      <div id="signup-form" className="signup-form">
        {/* show steps and links */}
        <StepLinks />

        {/* show the forms */}
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact component={ProfileForm} />
            <Route path="/social" component={SocialForm} />
            <Route path="/review" component={Review} />
          </Switch>
        </AnimatePresence>
      </div>
    </SignupFormProvider>
  );
}
