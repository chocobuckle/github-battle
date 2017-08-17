import React from 'react';
import { string, number, object, oneOfType } from 'prop-types';
import Profile from './Profile';

export default function Player({ label, profileInfo, score }) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
      <Profile profileInfo={profileInfo} />
    </div>
  );
}

Player.propTypes = {
  label: string.isRequired,
  score: number.isRequired,
  profileInfo: oneOfType([
    string,
    object,
    number
  ]).isRequired
};
