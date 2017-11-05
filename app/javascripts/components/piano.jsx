import React from 'react';
import Synth from 'synth';
import MidiDevice from 'midi_device';

import OctavesContainer from 'components/octaves_container';
import Controls from 'components/controls';

export default class Piano extends React.Component {
  constructor() {
    super();

    this.synth = new Synth();
    this.state = { notes: {} };
  }

  async setMidi(id) {
    if (this._midi) this._midi.disconnect();

    this._midi = await MidiDevice.find(id);
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
        <Controls setMidi={(id) => this.setMidi(id)} />
        <OctavesContainer notes={this.state.notes} />
      </div>
    );
  }
}
