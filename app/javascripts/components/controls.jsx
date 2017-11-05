import React from 'react';

import Controller from 'components/controller';
import OctavesControl from 'components/octaves_control';

export default class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <div className="round-control round-control-1"></div>
        <div className="round-control round-control-2"></div>
        <div className="round-control round-control-3"></div>

        <Controller setMidi={this.props.setMidi}/>
        <OctavesControl octaves={this.props.octaves} setOctaves={this.props.setOctaves}/>

        <div className="midiman-logo-bg"></div>
        <div className="midiman-logo">midiman</div>
      </div>
    );
  }
}
