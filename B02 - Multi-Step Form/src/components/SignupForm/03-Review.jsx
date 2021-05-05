import React from 'react';

import { useSignupForm } from './SignupFormContext';
import Animator from './Animator';

export default function Review() {
  const { profile, social } = useSignupForm();

  function handleSubmit(e) {
    e.preventDefault();
    alert('you are submitting! congrats!');
  }

  return (
    <Animator>
      <div className="review" id="review">
        <form onSubmit={handleSubmit}>
          <p>Hi, I am review</p>
          <p>
            <span>Name: </span>
            {profile.name}
          </p>
          <p>
            <span>Email: </span>
            {profile.email}
          </p>
          <p>
            <span>Twitter: </span>
            {social.twitter}
          </p>
          <p>
            <span>Facebook: </span>
            {social.facebook}
          </p>
          <input type="submit" value="Submit All Info" />
        </form>
      </div>
    </Animator>
  );
}
