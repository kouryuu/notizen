'use strict';

import React from 'react';

require('styles/note/Body.css');

class BodyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      lines: 1
    };
  }
  ChangeValue(event) {
    this.setState({text:event.target.value});
  }
  GrowInput(event) {
    if(event.key === 'Enter' || event.key === 'Backspace'){
      this.setState({lines: this.getNumberOfLines(this.state.text)});
    }
  }
  getNumberOfLines(text) {
    return text.split('\n').length;
  }
  render() {
    return (
      <div className="body-wrapper">
      <textarea type="text" className="body-component" placeholder={ this.props.text } value={ this.state.text } onChange={ this.ChangeValue.bind(this) } onKeyUp={ this.GrowInput.bind(this) } rows={ this.state.lines }/>
      </div>
    );
  }
}

BodyComponent.displayName = 'NoteBodyComponent';

// Uncomment properties you need
// BodyComponent.propTypes = {};
// BodyComponent.defaultProps = {};

export default BodyComponent;
