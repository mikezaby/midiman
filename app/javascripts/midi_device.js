import MidiEvent from 'midi_event';

export default class MidiDevise {
  static async devices() {
    return (await this._inputs()).map((input) => new MidiDevise(input));
  }

  static async find(id) {
    const input = (await this._inputs()).find((input) => input.id == id);

    return new MidiDevise(input);
  }

  static async _inputs() {
    const inputs = [];

    const access = await navigator.requestMIDIAccess();
    access.inputs.forEach((input) => inputs.push(input));

    return inputs;
  }

  constructor(midi) {
    this.id = midi.id;
    this.name = midi.name;
    this._midi = midi;
    this.connect();
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
