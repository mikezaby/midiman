import React from 'react';
import Synth from 'synth';
import MidiDevice from 'midi_device';

import OctavesContainer from 'components/octaves_container';
import Controls from 'components/controls';

export default class Piano extends React.Component {
  constructor() {
    super();

    this.synth = new Synth();
    this.setMidi();

    this.state = { notes: {} };
  }

  async setMidi() {
    this._midi = await MidiDevice.find('C4A71CFFB1F57240A0A43F7510E09EBC96BD26E9E28D28329014C1226BBD9E32');
    this._midi.connect();
    this._midi.onNote((event) => {
      event.type === 'noteOn' ? this.synth.play(event.note) : this.synth.stop();

      if (event.isNote) {
        this.setNote(event.note, event.type === 'noteOn');
      }
    });
  }

  setNote(note, noteOn) {
    const octave = this.state.notes[note.octave] || {};
    octave[note.name] = noteOn;
    this.state.notes[note.octave] = octave;
    this.setState({ notes: this.state.notes });
  }

  render() {
    return (
      <div className="piano">
        <Controls />
        <OctavesContainer notes={this.state.notes}/>
      </div>
    );
  }
}
