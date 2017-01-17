'use strict';

import React from 'react';
import TimeTag from './TimeTagComponent';
require('styles/note/Tag.css');

class TagComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="tag-component">
        { (this.props.type === 'time') ? <TimeTag></TimeTag> : '' }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
