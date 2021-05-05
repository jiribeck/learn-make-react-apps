import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useSignupForm } from './SignupFormContext';
import Animator from './Animator';

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { profile, setProfile } = useSignupForm();

  function onSubmit(data) {
    setProfile(data);
    history.push('/social');
  }

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Animator>
      <div class="profile-form" id="profile-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Tell us about yourself</h2>
          <input
            type="text"
            name="name"
            placeholder="What's your name?"
            defaultValue={profile.name}
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required!',
              },
            })}
          />
          <p>{errors.name && errors.name.message}</p>
          <input
            type="email"
            name="email"
            placeholder="What's your email?"
            defaultValue={profile.email}
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required!',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Valid email required!',
              },
            })}
          />
          <p>{errors.email && errors.email.message}</p>

          <input type="submit" value="Next" />
        </form>
      </div>
    </Animator>
  );
}
