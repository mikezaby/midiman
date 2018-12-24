import React, { Fragment } from 'react';
import MidiDevice from './MidiDevice';
import OctavesControl from './OctavesControl';

export default class Controls extends React.Component {
  render() {
    return (
      <Fragment>
        <MidiDevice setMidi={this.props.setMidi} midiId={this.props.midiId} />
        <OctavesControl octaves={this.props.octaves} setOctaves={this.props.setOctaves}/>
      </Fragment>
    );
  }
}
