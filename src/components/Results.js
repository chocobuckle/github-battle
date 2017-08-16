import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';
import Loading from './Loading';
import Player from './Player';

export default class Results extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  async componentDidMount() {
    try {
      const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
      const [ winner, loser ] = await api.battle([
        playerOneName,
        playerTwoName
      ]);

      this.setState(() => {  // eslint-disable-line react/no-did-mount-set-state
        return {
          winner,
          loser,
          loading: false,
          error: null
        };
      });
    } catch (error) {
      console.warn('Error with \'api.battle\' AJAX request: ', error);
      this.setState(() => { // eslint-disable-line react/no-did-mount-set-state
        return {
          error: 'Looks like there was an error. Check that both users exist on Github.',
          loading: false
        };
      });
    }
  }

  render() {
    const { winner, loser, loading, error } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          profileInfo={winner.profile}
          score={winner.score}
        />
        <Player
          label='Loser'
          profileInfo={loser.profile}
          score={loser.score}
        />
      </div>
    );
  }
}

