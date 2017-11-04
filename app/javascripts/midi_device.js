const NOTES = ['c', 'c-sharp', 'd', 'd-sharp', 'e', 'f', 'f-sharp', 'g', 'g-sharp', 'a', 'a-sharp', 'b'];

const TYPES = {
  8: 'noteOff',
  9: 'noteOn'
};

export default class MidiDevise {
  static async devices() {
    return (await this.inputs()).map((input) => new MidiDevise(input));
  }

  static async find(id) {
    const input = (await this.inputs()).find((input) => input.id == id);

    return new MidiDevise(input);
  }

  static async inputs() {
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
    this._midi.onmidimessage = (e) => this.processEvent(e);
  }

  processEvent(e) {
    const data = e.data;
    const type = this.type(data);

    switch (type) {
    case 'noteOn':
    case 'noteOff':
      this.noteCallback(type, this.note(data[1]), this.octave(data[1]));
    }
  }

  onNote(callback) {
    this.noteCallback = callback;
  }

  type(data) {
    const type = TYPES[data[0] >> 4];

    if (type === 'noteOn' && data[2] === 0) {
      return 'noteOff';
    }

    return type;
  }

  note(num) {
    return NOTES[num % 12];
  }

  octave(num) {
    return Math.floor(num / 12);
  }
}
