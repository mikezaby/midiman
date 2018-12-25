import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Synth from 'Synth';

import OctavesContainer from 'components/OctavesContainer';
import Controls from 'components/Controls';
import { connectedDevice } from 'components/Controller/actions';

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.synth = new Synth();

    const octaves = parseInt(localStorage.getItem('octaves')) || 6;

    this.state = { notes: {}, octaves: octaves };
    this.sendNotes();
  }

  componentDidUpdate(nextProps) {
    if (this.props.deviceID !== nextProps.deviceID) {
      this.sendNotes();
    }
  }

  sendNotes = () => {
    const device = this.props.connectedDevice();
    if (!device) return;

    device.onNote((event) => {
      event.type === 'noteOn' ? this.synth.play(event.note) : this.synth.stop(event.note);

      if (event.isNote) {
        this.setNote(event.note, event.type === 'noteOn');
      }
    });
  }

  setNote(note, noteOn) {
    const octave = this.state.notes[note.octave] || {};
    octave[note.name] = noteOn;
    this.state.notes[note.octave] = octave;
    this.setState({ notes: this.state.notes });
  }

  setOctaves = (num) => {
    this.setState({ octaves: num });
    localStorage.setItem('octaves', num);
  }

  className() {
    const classNames = ['piano'];
    if (this.state.octaves == 1) {
      classNames.push('x-small');
    }

    if (this.state.octaves == 2) {
      classNames.push('small');
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className={this.className()}>
        <Controls
          setOctaves={this.setOctaves}
          setOscillator={this.synth.setOscillator}
          octaves={this.state.octaves}
        />
        <OctavesContainer notes={this.state.notes} octaves={this.state.octaves}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  connectedDevice: bindActionCreators(connectedDevice, dispatch)
});

const mapStateToProps = (state) => ({
  deviceID: state.controller.deviceID
});

export default connect(mapStateToProps, mapDispatchToProps)(Piano);
