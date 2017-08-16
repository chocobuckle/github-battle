import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';

export default class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset = (id) => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    });
  }

  render() {
    const { match } = this.props; // eslint-disable-line react/prop-types
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {/* eslint-disable react/jsx-no-bind */}
          {!playerOneName &&
            <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button className='reset' onClick={() => this.handleReset('playerOne')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button className='reset' onClick={() => this.handleReset('playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
          {/* eslint-enable react/jsx-no-bind */}
        </div>

        {playerOneImage &&
          playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    );
  }
}
