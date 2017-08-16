import React from 'react';
import PropTypes from 'prop-types';

export default function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
        <li key={name} className='popular-item'>
          <ul className='space-list-items'>
            <li className='popular-rank'>#{index + 1}</li>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={`Avatar for ${owner.login}`}
              />
            </li>
            {/* eslint-disable camelcase */}
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};
