'use strict';

import React from 'react';

require('styles/note/CheckboxTag.css');

class CheckboxTagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    }
  }
  toggleCheck() {
    this.setState({checked: !this.state.checked});
  }
  render() {
    return (
      <div className="checkboxtag-component">
        <a href="#" onClick={ this.toggleCheck.bind(this) }>
          { (this.state.checked)?<i className="fa fa-check-square-o" aria-hidden="true"></i>:<i className="fa  fa-square-o" aria-hidden="true"></i> }
        </a>
      </div>
    );
  }
}

CheckboxTagComponent.displayName = 'NoteCheckboxTagComponent';

// Uncomment properties you need
// CheckboxTagComponent.propTypes = {};
// CheckboxTagComponent.defaultProps = {};

export default CheckboxTagComponent;
