'use strict';

import React from 'react';

require('styles/note/AddButton.css');

class AddButtonComponent extends React.Component {
  render() {
    return (
      <div className="addbutton-component">
        <a href="#" onClick={ this.props.clickHandler } >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </a>
      </div>
    );
  }
}

AddButtonComponent.displayName = 'NoteAddButtonComponent';

// Uncomment properties you need
// AddButtonComponent.propTypes = {};
// AddButtonComponent.defaultProps = {};

export default AddButtonComponent;
