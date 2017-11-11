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

  static async onStateChange(callback) {
    const access = await navigator.requestMIDIAccess();

    access.onstatechange = (e) => {
      if (e.port.type !== 'input') return;

      const midi = new MidiDevise(e.port);

      callback(midi);
    };
  }

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
