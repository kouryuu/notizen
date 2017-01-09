'use strict';

import React from 'react';
import TimeTag from './TimeTagComponent';
require('styles/note/Tag.css');

class TagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 'Time'
    };
  }
  render() {
    return (
      <div className="tag-component">
        { (this.state.type === 'Time') ? <TimeTag></TimeTag> : '' }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
