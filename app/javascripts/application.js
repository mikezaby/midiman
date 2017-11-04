import 'babel-polyfill';

import 'styles/application.scss';
import MidiDevice from 'midi_device';

window.MidiDevice = MidiDevice;

const triggerKeyboard = (type, note, octave) => {
  console.log(type, note, octave)
  const octaveEl = document.querySelector(`.octave:nth-child(${octave-2}`)
  const noteEl = octaveEl.querySelector(`.${note}`)

  noteEl.classList.toggle('active', type === 'noteOn')
}

const init = async () => {
  const midi = await MidiDevice.find('FEC3FB776CFAC58F6E504F4F035731965BEBDEB2CC68E6EAFDE649B32E3B55F7');
  midi.onNote(triggerKeyboard);
};

init();
