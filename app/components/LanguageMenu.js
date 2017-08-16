import React from 'react';
import PropTypes from 'prop-types';

function LanguageMenu({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  /* eslint-disable react/jsx-no-bind, jsx-a11y/no-noninteractive-element-interactions */
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
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default LanguageMenu;
