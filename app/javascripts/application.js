import 'babel-polyfill';

import MidiDevice from 'midi_device';

import 'styles/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Piano from 'components/piano';

window.MidiDevice = MidiDevice;

ReactDOM.render(
  <Piano />,
  document.querySelector('[data-component=piano]')
);
