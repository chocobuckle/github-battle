import React, { Component } from 'react';
import Loading from './Loading';
import LanguageMenu from './LanguageMenu';
import RepoGrid from './RepoGrid';
import api from '../utils/api';

export default class Popular extends Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async (lang) => {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    try {
      const repos = await api.fetchPopularRepos(lang);
      this.setState(() => {
        return {
          repos
        };
      });
    } catch (error) {
      console.warn('Error with \'api.fetchPopularRepos\' AJAX request: ', error);
    }
  }

  render() {
    const { selectedLanguage, repos } = this.state;

    return (
      <div>
        <LanguageMenu
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    );
  }
}
