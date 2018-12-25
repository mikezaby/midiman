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
    case types.ADD_DEVICE:
    case types.REMOVE_DEVICE: {
      const { type, device } = action;

      const newDevices = type === types.ADD_DEVICE
        ? [...state.devices, device]
        : state.devices.filter((dev) => dev.id !== device.id);

      return { ...state, devices: newDevices };
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
