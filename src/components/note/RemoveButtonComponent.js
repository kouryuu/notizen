'use strict';

import React from 'react';

require('styles/note/RemoveButton.css');

class RemoveButtonComponent extends React.Component {
  render() {
    return (
      <div className="addbutton-component">
        <a href="#" onClick={ this.props.clickHandler } >
        <i className="fa fa-minus-circle" aria-hidden="true"></i>
        </a>
      </div>
    );
  }
}

RemoveButtonComponent.displayName = 'NoteRemoveButtonComponent';

// Uncomment properties you need
// RemoveButtonComponent.propTypes = {};
// RemoveButtonComponent.defaultProps = {};

export default RemoveButtonComponent;
