'use strict';

import React from 'react';
import TimeTag from './TimeTagComponent';
import ColorTag from './ColorTagComponent';
import CheckboxTag from './CheckboxTagComponent';
require('styles/note/Tag.css');

class TagComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="tag-component">
        { (this.props.tag.type === TagType.TIME_TAG) ? <TimeTag id={ this.props.id }></TimeTag> : '' }
        { (this.props.tag.type === TagType.COLOR_TAG) ? <ColorTag id={ this.props.id }></ColorTag> : '' }
        { (this.props.tag.type === TagType.CHECKBOX_TAG) ? <CheckboxTag id={ this.props.id }></CheckboxTag> : '' }
      </div>
    );
  }
}

TagComponent.displayName = 'NoteTagComponent';

// Uncomment properties you need
// TagComponent.propTypes = {};
// TagComponent.defaultProps = {};

export default TagComponent;
