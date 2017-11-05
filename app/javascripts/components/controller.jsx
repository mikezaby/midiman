import React from 'react';

import MidiDevice from 'midi_device';

export default class Controller extends React.Component {
  constructor(props = {}) {
    super(props);

    this.state = { devices: [] };
    this.fetchDevises();
  }

  onChange(e) {
    this.props.setMidi(e.currentTarget.value);
  }

  fetchDevises() {
    MidiDevice.devices().then((devices) => {
      this.setState({ devices: devices });
    });
  }

  devices() {
    const devices = [['', 'Select midi'], ...this.state.devices.map((d) => [d.id, d.name])];
    return devices.map(([id, name]) => <option key={id} value={id}>{name}</option>);
  }

  render() {
    return (
      <select className="drop-control" onChange={(e) => this.onChange(e)}>
        {this.devices()}
      </select>
    );
  }
}
