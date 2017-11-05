export default class Note {
  static NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  constructor(eventOrString) {
    if (typeof eventOrString === 'string') {
      this._fromString(eventOrString);
    } else {
      this._fromEvent(eventOrString);
    }
  }

  _fromString(string) {
    this.name = string.slice(0, -1);
    this.octave = string.slice(-1);
  }

  _fromEvent(event) {
    this.name = this.constructor.NOTES[event.data[1] % 12];
    this.octave = Math.floor(event.data[1] / 12);
  }
}
