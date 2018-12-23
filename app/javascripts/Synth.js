import Tone from 'tone';

export default class Synth {
  constructor() {
    this.setTone();
  }

  play(note) {
    this.tone.triggerAttack(`${note.name}${note.octave}`);
  }

  stop(note) {
    this.tone.triggerRelease(`${note.name}${note.octave}`);
  }

  setTone(type = 'sine') {
    this.tone = new Tone.PolySynth(8, Tone.Synth, {
      oscillator: {
        type: type,
      },
    }).toMaster();
  }

  setOscillator = oscillator => {
    this.setTone(oscillator);
  };
}
