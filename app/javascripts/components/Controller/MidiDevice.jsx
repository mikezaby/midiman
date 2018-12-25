import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeDevices, selectDevice } from './actions';

class MidiDevice extends React.Component {
  constructor(props) {
    super(props);

    props.initializeDevices();
  }

  onChange = (e) => {
    this.props.selectDevice(e.currentTarget.value);
  }

  devices() {
    const devices = [['', 'Select midi'], ...this.props.devices.map((d) => [d.id, d.name])];
    return devices.map(([id, name]) => <option key={id} value={id}>{name}</option>);
  }

  render() {
    return (
      <select className="drop-control" onChange={this.onChange} value={this.props.deviceID}>
        {this.devices()}
      </select>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  initializeDevices: bindActionCreators(initializeDevices, dispatch),
  selectDevice: bindActionCreators(selectDevice, dispatch)
});

const mapStateToProps = (state) => ({
  devices: state.controller.devices,
  deviceID: state.controller.deviceID,
});

export default connect(mapStateToProps, mapDispatchToProps)(MidiDevice);
