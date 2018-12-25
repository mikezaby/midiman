import 'babel-polyfill';

import MidiDevice from 'MidiDevice';

import 'styles/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from 'reducer';
import Piano from 'components/Piano';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

window.MidiDevice = MidiDevice;

ReactDOM.render(
  <Provider store={store}>
    <Piano />
  </Provider>,
  document.querySelector('[data-component=piano]')
);
