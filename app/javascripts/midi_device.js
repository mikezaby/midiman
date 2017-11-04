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

    const access = await navigator.requestMIDIAccess()
    access.inputs.forEach((input) => inputs.push(input));

    return inputs;
  }

  constructor(midi) {
    this.id = midi.id;
    this.name = midi.name;
    this.midi = midi;
  }
}
