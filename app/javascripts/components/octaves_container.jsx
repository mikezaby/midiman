import React from 'react';

import Octave from 'components/octave';

export default class OctavesContainer extends React.Component {
  render() {
    return (
      <div className="octaves-container">
        <Octave octave={4} notes={this.props.notes[4] || {}} />
        <Octave octave={5} notes={this.props.notes[5] || {}} />
        <Octave octave={6} notes={this.props.notes[6] || {}} />
      </div>
    );
  }
}
