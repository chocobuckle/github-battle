import React from 'react';
import { string, func } from 'prop-types';

export default function LanguageMenu({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  return (
    <ul className='languages'>
      {languages.map(lang => (
        <li
          style={lang === selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => onSelect(lang)}
          key={lang}>
          {lang}
        </li>)
      )}
    </ul>
  );
}

LanguageMenu.propTypes = {
  selectedLanguage: string.isRequired,
  onSelect: func.isRequired
};
