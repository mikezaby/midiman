import React from 'react';

import MidiDevice from 'midi_device';

export default class Controller extends React.Component {
  constructor(props = {}) {
    super(props);

    this.state = { devices: [] };
    this.fetchDevises();
    this.listenMidiChanges();
  }

  onChange = (e) => {
    this.props.setMidi(e.currentTarget.value);
  }

  listenMidiChanges() {
    MidiDevice.onStateChange((midi) => {
      const devices = this.state.devices;

      if (midi.state === 'disconnected') {
        const index = devices.findIndex((dev) => dev.id === midi.id);
        if (index < 0) return;

        devices.splice(index, 1);
      } else {
        devices.push(midi);
      }

      this.setState({ devices: devices });
    });
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
      <select className="drop-control" onChange={this.onChange} value={this.props.midiId}>
        {this.devices()}
      </select>
    );
  }
}
