import React from 'react';

export default class OctavesControl extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  onChange = (e) => {
    this.props.setOctaves(e.currentTarget.value);
  }

  octaves() {
    const octaves = [['', 'Select Octaves'], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7], [8,8]];
    return octaves.map(([id, name]) => <option key={id} value={id}>{name}</option>);
  }

  render() {
    return (
      <select className="drop-control" onChange={this.onChange} value={this.props.octaves}>
        {this.octaves()}
      </select>
    );
  }
}
