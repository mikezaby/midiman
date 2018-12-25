import * as types from './constants';

const initialState = {
  devices: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INITIALIZE_DEVICES:
      return {
        ...state,
        devices: [...action.devices]
      };
    case types.ADD_DEVICE: {
      const { device } = action;

      const newDevices = state.devices.findIndex((dev) => dev.id === device.id) > -1
        ? state.devices
        : [...state.devices, device];

      return { ...state, devices: newDevices };
    }
    case types.REMOVE_DEVICE: {
      const { device } = action;

      return { ...state, devices: state.devices.filter((dev) => dev.id !== device.id) };
    }
    case types.SELECT_DEVICE: {
      const { deviceID } = action;

      localStorage.setItem('midiDevice', deviceID);

      return { ...state, deviceID: deviceID };
    }
    default:
      return state;
  }
};
