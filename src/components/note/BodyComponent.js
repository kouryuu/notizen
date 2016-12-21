'use strict';

import React from 'react';

require('styles/note/Body.css');

class BodyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }
  ChangeValue(event) {
    this.setState({text:event.target.value});
  }
  render() {
    return (
      <div>
      <input type="text" className="body-component" placeholder={this.props.text} value={ this.state.text } onChange={ this.ChangeValue } />
      </div>
    );
  }
}

BodyComponent.displayName = 'NoteBodyComponent';

// Uncomment properties you need
// BodyComponent.propTypes = {};
// BodyComponent.defaultProps = {};

export default BodyComponent;
