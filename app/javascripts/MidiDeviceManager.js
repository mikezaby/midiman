import MidiDevice from 'MidiDevice';

class MidiDeviceManager {
  async fetchDevices() {
    if (this.devices) return this.devices;

    this.devices = (await this._inputs()).map((input) => new MidiDevice(input));

    return this.devices;
  }

  async find(id) {
    return (await this.fetchDevices()).find((dev) => dev.id == id);
  }

  async _inputs() {
    const inputs = [];

    const access = await navigator.requestMIDIAccess();
    access.inputs.forEach((input) => inputs.push(input));

    return inputs;
  }

  async onStateChange(callback) {
    const access = await navigator.requestMIDIAccess();
    await this.fetchDevices();

    access.onstatechange = (e) => {
      if (e.port.type !== 'input') return;

      const input = e.port;

      console.log(input)
      const midi = new MidiDevice(input);

      callback(midi);
    };
  }
}

export default new MidiDeviceManager;
