'use strict';

import React from 'react';
import store from '../../stores/store.js'
// actions
import{ REPLACE_TAG, GET_NOTE_TAG } from '../../actions/actions'
require('styles/note/CheckboxTag.css');

class CheckboxTagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    }
  }
  componentDidMount() {
    let tag = store(GET_NOTE_TAG,this.props.id);
    this.setState({checked: tag.isChecked()});
  }
  toggleCheck() {
    let tag = store(GET_NOTE_TAG,this.props.id);
    tag.toggleCheck();
    store(REPLACE_TAG,this.props.id, tag);
    this.setState({checked: tag.isChecked()});
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
