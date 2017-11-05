import React from 'react';

import Controller from 'components/controller';

export default class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <div className="round-control round-control-1"></div>
        <div className="round-control round-control-2"></div>
        <div className="round-control round-control-3"></div>

        <Controller setMidi={this.props.setMidi}/>

        <select className="drop-control" name="midiman-keys" id="midiman-keys">
          <option value="1">keys: 32 ▾</option>
          <option value="2">keys: 48 ▾</option>
          <option value="3">keys: 10^4 ▾</option>
        </select>

        <div className="midiman-logo-bg"></div>
        <div className="midiman-logo">midiman</div>
      </div>
    );
  }
}
