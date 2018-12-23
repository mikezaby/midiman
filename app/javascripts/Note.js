export default class Note {
  static NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  static notes() {
    if (this._notes) { return this._notes; }

    return this._notes = this.NOTES.map((note) => new Note(note));
  }

  constructor(eventOrString) {
    if (typeof eventOrString === 'string') {
      this._fromString(eventOrString);
    } else {
      this._fromEvent(eventOrString);
    }
  }

  get isSemi() {
    return this.name.slice(-1) === '#';
  }

  _fromString(string) {
    const matches = string.match(/(\w#?)(\d)?/);
    this.name = matches[1];
    this.octave = matches[2] || 1;
  }

  _fromEvent(event) {
    this.name = this.constructor.NOTES[event.data[1] % 12];
    this.octave = Math.floor(event.data[1] / 12);
  }
}
