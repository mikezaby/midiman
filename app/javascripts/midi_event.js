import Note from 'note';

export default class MidiEvent {
  static TYPES = {
    8: 'noteOff',
    9: 'noteOn'
  };

  constructor(event) {
    this._event = event;
    this.data = event.data;
  }

  get type() {
    if (this._type) return this._type;

    let type = this.constructor.TYPES[this.data[0] >> 4];

    if (type === 'noteOn' && this.data[2] === 0) {
      type = 'noteOff';
    }

    return this._type = type;
  }

  get isNote() {
    return this.type === 'noteOn' || this.type === 'noteOff';
  }

  get note() {
    if (!this.isNote) {
      return;
    } else if(this._note) {
      return this._note;
    }

    return this._note = new Note(this._event);
  }
}
