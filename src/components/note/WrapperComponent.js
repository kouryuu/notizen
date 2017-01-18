'use strict';

import React from 'react';
import Body from './BodyComponent';
import Tag from './TagComponent';
import Settings from './NoteSettingsComponent';
require('styles/note/Wrapper.css');

class WrapperComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      tagType: 'time'
    }
  }
  changeToTimeTag() {
    this.setState({tagType: 'time'})
  }
  changeToColorTag() {
    this.setState({tagType: 'color'})
  }
  changeToCheckboxTag() {
  render() {
    return (
      <div className="wrapper-component">
        <Tag type={ this.state.tagType }></Tag>
        <Body text="Write something here."></Body>
        <Settings changeToTimeTag={ this.changeToTimeTag.bind(this) }
            changeToColorTag={ this.changeToColorTag.bind(this) } >
        </Settings>
      </div>
    );
  }
}

WrapperComponent.displayName = 'NoteWrapperComponent';

// Uncomment properties you need
// WrapperComponent.propTypes = {};
// WrapperComponent.defaultProps = {};

export default WrapperComponent;
