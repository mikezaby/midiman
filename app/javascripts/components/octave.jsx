import React from 'react';
import Note from 'note';
import Key from 'components/key';

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
