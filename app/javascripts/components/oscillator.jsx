import React from 'react';

const waveforms = ['sine', 'square', 'triangle', 'sawtooth'];

export default class Oscillator extends React.Component {
  constructor(props = {}) {
    super(props);

    this.state = {waveform: 'sine'};
  }

  onChange = e => {
    this.props.setOscillator(e.currentTarget.value);
    this.setState({waveform: e.currentTarget.value});
  };

  waveforms() {
    return waveforms.map(name => (
      <option key={name} value={name}>
        {name}
      </option>
    ));
  }

  render() {
    return (
      <select
        className="drop-control"
        onChange={this.onChange}
        value={this.state.waveform}>
        {this.waveforms()}
      </select>
    );
  }
}
