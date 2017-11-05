import React from 'react';

import Octave from 'components/octave';

export default class OctavesContainer extends React.Component {
  octaves() {
    const number = parseInt(this.props.octaves) + 1;
    const octaves = [];

    for (let i = 1; i < number ; i++) {
      octaves.push(<Octave key={i} octave={i} notes={this.props.notes[i] || {}} />);
    }

    return octaves;
  }

  render() {
    return (
      <div className="octaves-container">
        {this.octaves()}
      </div>
    );
  }
}
