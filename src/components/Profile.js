import React from 'react';
import { oneOfType, string, number } from 'prop-types';
import PlayerPreview from './PlayerPreview';

export default function Profile({ profileInfo }) {
  return (
    <PlayerPreview username={profileInfo.login} avatar={profileInfo.avatar_url}>
      <ul className='space-list-items'>
        {profileInfo.name && <li>{profileInfo.name}</li>}
        {profileInfo.location && <li>{profileInfo.location}</li>}
        {profileInfo.company && <li>{profileInfo.company}</li>}
        <li>Followers: {profileInfo.followers}</li>
        <li>Following: {profileInfo.following}</li>
        <li>Public Repos: {profileInfo.public_repos}</li>
        {profileInfo.blog && <li><a href={profileInfo.blog}>{profileInfo.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  profileInfo: oneOfType([
    string,
    number
  ])
}.isRequired;
