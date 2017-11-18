import React from 'react';
import Synth from 'synth';
import MidiDevice from 'midi_device';

import OctavesContainer from 'components/octaves_container';
import Controls from 'components/controls';

export default class Piano extends React.Component {
  constructor() {
    super();

    this.synth = new Synth();

    const midiId = localStorage.getItem('midiDevice') || '';
    const octaves = parseInt(localStorage.getItem('octaves')) || 6;

    this.state = { notes: {}, octaves: octaves, midiId: midiId };
    this.setMidi(midiId, true);
  }

  setMidi = async (id, initial = false) => {
    if (this._midi) this._midi.disconnect();

    if (!initial) {
      this.setState({ midiId: id });
      localStorage.setItem('midiDevice', id);
    }

    if (id.length === 0) return;

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

  setOctaves = (num) => {
    this.setState({ octaves: num });
    localStorage.setItem('octaves', num);
  }

  className() {
    const classNames = ['piano'];
    if (this.state.octaves == 1) {
      classNames.push('x-small');
    }

    if (this.state.octaves == 2) {
      classNames.push('small');
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className={this.className()}>
        <Controls
          midiId={this.state.midiId}
          setMidi={this.setMidi}
          setOctaves={this.setOctaves}
          octaves={this.state.octaves}
        />
        <OctavesContainer notes={this.state.notes} octaves={this.state.octaves}
        />
      </div>
    );
  }
}
