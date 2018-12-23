import React from 'react';
import Note from 'Note';
import Key from 'components/Key';

export default class Octave extends React.Component {
  keys() {
    return Note.notes().map((note, index) =>
      <Key key={index} note={note} active={this.props.notes[note.name]}/>
    );
  }

  render() {
    return (
      <div className="octave">
        {this.keys()}
      </div>
    );
  }
}
