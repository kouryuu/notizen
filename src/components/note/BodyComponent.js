'use strict';

import React from 'react';
import store from '../../stores/store.js'
require('styles/note/Body.css');
// actions
import{ GET_NOTE_BODY, CHANGE_BODY } from '../../actions/actions'
class BodyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      lines: 1
    };
  }
  ChangeValue(event) {
    store(CHANGE_BODY,this.props.id, event.target.value);
    this.setState({text:store(GET_NOTE_BODY,this.props.id)});
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
      <textarea type="text" className="body-component" placeholder={ 'Write something here.' } value={ this.state.text } onChange={ this.ChangeValue.bind(this) } onKeyUp={ this.GrowInput.bind(this) } rows={ this.state.lines }/>
      </div>
    );
  }
}

BodyComponent.displayName = 'NoteBodyComponent';

// Uncomment properties you need
// BodyComponent.propTypes = {};
// BodyComponent.defaultProps = {};

export default BodyComponent;
