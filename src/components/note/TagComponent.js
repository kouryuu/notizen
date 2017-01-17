'use strict';

import React from 'react';
import TimeTag from './TimeTagComponent';
import ColorTag from './ColorTagComponent';
require('styles/note/Tag.css');

class TagComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="tag-component">
        { (this.props.type === 'time') ? <TimeTag></TimeTag> : '' }
        { (this.props.type === 'color') ? <ColorTag></ColorTag> : '' }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
