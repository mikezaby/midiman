import React from 'react';

export default class Key extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  className() {
    const names = [];
    names.push(this.props.note.name.toLowerCase().replace('#', '-sharp'));
    this.props.note.isSemi ? names.push('semi-tone') : names.push('whole-tone');

    if (this.props.active) {
      names.push('active');
    }

    return names.join(' ');
  }

  render() {
    return (
      <div className={this.className()}></div>
    );
  }
}

