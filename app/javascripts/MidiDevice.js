import MidiEvent from 'MidiEvent';

export default class MidiDevice {
  constructor(midi) {
    this.id = midi.id;
    this.name = midi.name;
    this.state = midi.state;
    this._midi = midi;
  }

  connect() {
    this._midi.onmidimessage = (e) => this._processEvent(e);
  }

  disconnect() {
    this._midi.onmidimessage = null;
  }

  onNote(callback) {
    this.noteCallback = callback;
  }

  _processEvent(e) {
    const event = new MidiEvent(e);

    switch (event.type) {
      case 'noteOn':
      case 'noteOff':
        this.noteCallback(event);
    }
  }
}
