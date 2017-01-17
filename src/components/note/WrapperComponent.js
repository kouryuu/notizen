'use strict';

import React from 'react';
import Body from './BodyComponent';
import Tag from './TagComponent';
import Settings from './NoteSettingsComponent';
require('styles/note/Wrapper.css');

class WrapperComponent extends React.Component {
  render() {
    return (
      <div className="wrapper-component">
        <Tag></Tag><Body text="Write something here."></Body><Settings></Settings>
      </div>
    );
  }
}

WrapperComponent.displayName = 'NoteWrapperComponent';

// Uncomment properties you need
// WrapperComponent.propTypes = {};
// WrapperComponent.defaultProps = {};

export default WrapperComponent;
