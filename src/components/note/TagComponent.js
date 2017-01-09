'use strict';

import React from 'react';

require('styles/note/Tag.css');

class TagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: this.getCurrentTimeString(),
      type: 'Time'
    };
  }
  getCurrentTimeString() {
    let systemTime = new Date();
    let time = systemTime.getHours() + ':' + systemTime.getMinutes();
    return time;
  }
  render() {
    return (
      <div className="tag-component">
        { this.state.tag }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
