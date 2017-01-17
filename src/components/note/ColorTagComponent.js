'use strict';

import React from 'react';

require('styles/note/ColorTag.css');

class ColorTagComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      color:'#FF69B4'
    }
  }
  changeColor(event) {
    this.setState({color: event.target.value})
  }
  render() {
    return (
      <div className="colortag-component">
        <a href="#" onClick={ this.props.clickHandler } >
          <input type="color" value={ this.state.color } onChange={ this.changeColor }></input>
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
