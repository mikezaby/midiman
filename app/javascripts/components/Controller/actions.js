import MidiDeviceManager from 'MidiDeviceManager';
import { INITIALIZE_DEVICES, ADD_DEVICE, REMOVE_DEVICE, SELECT_DEVICE } from './constants';

export const initializeDevices = () => (dispatch, getState) => {
  MidiDeviceManager.fetchDevices().then((devices) => {
    dispatch({
      type: INITIALIZE_DEVICES,
      devices: devices
    });

    dispatch(selectDevice(localStorage.getItem('midiDevice')));
  });


  MidiDeviceManager.onStateChange((midi) => {
    const type = midi.state === 'disconnected' ? REMOVE_DEVICE : ADD_DEVICE;
    const { deviceID, devices } = getState().controller;

    if (type === REMOVE_DEVICE && midi.id === deviceID) {
      dispatch(selectDevice(null));
    }

    dispatch({
      type: type,
      device: midi
    });
  });
};

export const selectDevice = (newDeviceID) => (dispatch, getState) => {
  const { deviceID, devices } = getState().controller;

  let device = findDevice(deviceID, devices);
  if (device) device.disconnect();

  if (newDeviceID) {
    device = findDevice(newDeviceID, devices);
    device.connect();
  }

  dispatch({
    type: SELECT_DEVICE,
    deviceID: newDeviceID
  });
};

export const connectedDevice = () => (dispatch, getState) => {
  const { deviceID, devices } = getState().controller;
  if (deviceID === null) return null;

  return findDevice(deviceID, devices);
};

const findDevice = (id, devices) => devices.find((device) => device.id === id);
