import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useSignupForm } from './SignupFormContext';
import Animator from './Animator';

export default function SocialForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { social, setSocial } = useSignupForm();

  function onSubmit(data) {
    setSocial(data);
    history.push('/review');
  }

  return (
    <Animator>
      <div class="social-form" id="social-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>How can we find ou on social media?</h2>
          <input
            type="text"
            name="twitter"
            placeholder="What's your Twitter?"
            defaultValue={social.twitter}
            {...register('twitter', {
              required: {
                value: true,
                message: 'Twitter Account is required!',
              },
            })}
          />
          <p>{errors.twitter && errors.twitter.message}</p>
          <input
            type="text"
            name="facebook"
            placeholder="What's your Facebook?"
            defaultValue={social.facebook}
            {...register('facebook', {
              required: {
                value: true,
                message: 'Facebook is required!',
              },
            })}
          />
          <p>{errors.facebook && errors.facebook.message}</p>

          <input type="submit" value="Submit all info" />
        </form>
      </div>
    </Animator>
  );
}
