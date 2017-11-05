import Tone from 'tone';

export default class Synth {
  play(note) {
    this.tone.triggerAttack(`${note.name}${note.octave}`);
  }

  stop() {
    this.tone.triggerRelease();
  }

  get tone() {
    if (this._tone) return this._tone;

    return this._tone = new Tone.MonoSynth({
      'portamento' : 0.01,
      'oscillator' : {
        'type' : 'square'
      },
      'envelope' : {
        'attack' : 0.005,
        'decay' : 0.2,
        'sustain' : 0.4,
        'release' : 1.4,
      },
      'filterEnvelope' : {
        'attack' : 0.005,
        'decay' : 0.1,
        'sustain' : 0.05,
        'release' : 0.8,
        'baseFrequency' : 300,
        'octaves' : 4
      }
    }).toMaster();
  }
}
