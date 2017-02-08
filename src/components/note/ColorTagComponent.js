'use strict';

import React from 'react';
import store from '../../stores/store.js'

require('styles/note/ColorTag.css');

class ColorTagComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      color:''
    }
  }
  componentDidMount() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    this.setState({color: tag.getColor()});
  }
  changeColor(event) {
    let tag = store('GET_NOTE_TAG',this.props.id);
    tag.changeColor(event.target.value);
    store('REPLACE_TAG',this.props.id, tag);
    this.setState({color: tag.getColor()})
  }
  render() {
    return (
      <div className="colortag-component">
        <a href="#" onClick={ this.props.clickHandler } >
          <input type="color" value={ this.state.color } onChange={ this.changeColor.bind(this) }></input>
        </a>
      </div>
    );
  }
}

ColorTagComponent.displayName = 'NoteColorTagComponent';

// Uncomment properties you need
// ColorTagComponent.propTypes = {};
// ColorTagComponent.defaultProps = {};

export default ColorTagComponent;
