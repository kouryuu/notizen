'use strict';

import React from 'react';

require('styles/note/Tag.css');

class TagComponent extends React.Component {
  render() {
    return (
      <div className="tag-component">
        { "07:00" }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
