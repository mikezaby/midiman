import React from 'react';

export default class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <div className="round-control round-control-1"></div>
        <div className="round-control round-control-2"></div>
        <div className="round-control round-control-3"></div>

        <select className="drop-control" name="midiman-option" id="midi-option">
          <option value="1">model: midiman 32 ▾</option>
          <option value="2">model: midiman 48 ▾</option>
          <option value="3">model: midman 10^4 ▾</option>
        </select>

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
