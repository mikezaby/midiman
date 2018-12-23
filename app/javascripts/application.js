import 'babel-polyfill';

import MidiDevice from 'MidiDevice';

import 'styles/application.scss';
import 'react';
import ReactDOM from 'react-dom';

import Piano from 'components/Piano';

window.MidiDevice = MidiDevice;

ReactDOM.render(
  <Piano />,
  document.querySelector('[data-component=piano]')
);
