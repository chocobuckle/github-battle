import React, { Component } from 'react';
import { string, number } from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

export default class Loading extends Component {
  static propTypes = {
    text: string.isRequired,
    speed: number.isRequired
  }

  static defaultProps = {
    text: 'Loading',
    speed: 300
  }

  state = {
    text: this.props.text
  }

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = `${text}...`;
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            text: `${prevState.text}.`
          };
        });
      }
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}
