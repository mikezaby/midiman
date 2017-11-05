import React from 'react';
import Note from 'note';
import Key from 'components/key';

export default class Octave extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  keys() {
    return Note.notes().map((note, index) =>
      <Key key={index} note={note} active={this.props.notes[note.name]}/>
    );
  }

  render() {
    return (
      <div className="octave" key={this.props.octave}>
        {this.keys()}
      </div>
    );
  }
}
