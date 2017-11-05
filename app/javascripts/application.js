import 'babel-polyfill';

import 'styles/application.scss';
import MidiDevice from 'midi_device';
import Tone from 'tone';

window.MidiDevice = MidiDevice;

const synth = new Tone.MonoSynth({
  "portamento" : 0.01,
  "oscillator" : {
    "type" : "square"
  },
  "envelope" : {
    "attack" : 0.005,
    "decay" : 0.2,
    "sustain" : 0.4,
    "release" : 1.4,
  },
  "filterEnvelope" : {
    "attack" : 0.005,
    "decay" : 0.1,
    "sustain" : 0.05,
    "release" : 0.8,
    "baseFrequency" : 300,
    "octaves" : 4
  }
}).toMaster();


console.log(Tone.context.latencyHint = "fastest")

Tone.Transport.start

const triggerKeyboard = (event) => {
  const note = event.note;
  const octaveEl = document.querySelector(`.octave:nth-child(${note.octave-2}`);
  const noteEl = octaveEl.querySelector(`.${note.name.toLowerCase()}`);

  if (event.type === 'noteOn')
    synth.triggerAttack(`${note.name}${note.octave}`);
  else
    synth.triggerRelease();

  noteEl.classList.toggle('active', event.type === 'noteOn');
};

const init = async () => {
  const midi = await MidiDevice.find('C4A71CFFB1F57240A0A43F7510E09EBC96BD26E9E28D28329014C1226BBD9E32');
  midi.onNote(triggerKeyboard);
};

init();
