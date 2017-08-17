import React, { Component } from 'react';
import { string, func } from 'prop-types';

export default class PlayerInput extends Component {
  static propTypes = {
    id: string.isRequired,
    label: string.isRequired,
    onSubmit: func.isRequired
  }

  static defaultProps = {
    label: 'Username'
  }

  state = {
    username: ''
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState(() => {
      return {
        username: value
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!username}>
            Submit
        </button>
      </form>
    );
  }
}

