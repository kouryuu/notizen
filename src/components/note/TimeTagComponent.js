'use strict';

import React from 'react';
import AddButton from './AddButtonComponent'
import RemoveButton from './RemoveButtonComponent'

require('styles/note/TimeTag.css');

class TimeTagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      controlsDisplayed: {
          display: 'none'
        }
    };
  }

  zeroedNumber(number) {
    return (parseInt(number) > 9)?number:'0'+number;
  }
  render() {
    let toggleControls= function(event) {
      event.preventDefault();
      console.log(this.state.controlsDisplayed.display);
      if(this.state.controlsDisplayed.display === 'none'){
        this.setState({controlsDisplayed: {display: 'flex'}});
      }
      if(this.state.controlsDisplayed.display === 'flex'){
        this.setState({controlsDisplayed: {display: 'none'}});
      }
    };
    return (
      <div className="timetag-component-wrapper">
        <div className="timertag-component" >
          <a href="#" onClick={ toggleControls.bind(this) } >
          { this.zeroedNumber(this.state.hour) } {':'} { this.zeroedNumber(this.state.minute) }
          </a>
        </div>
        <div className="controls" style={ this.state.controlsDisplayed }>
          <div className="hour-control-buttons">
            <AddButton clickHandler={ this.increaseHour.bind(this) }></AddButton>
            <RemoveButton clickHandler={ this.decreaseHour.bind(this) }></RemoveButton>
          </div>
          <div className="minute-control-buttons">
            <AddButton clickHandler={ this.increaseMinute.bind(this) }></AddButton>
            <RemoveButton clickHandler={ this.decreaseMinute.bind(this) }></RemoveButton>
          </div>
        </div>
      </div>
    );
  }
}

TimeTagComponent.displayName = 'NoteTimeTagComponent';

// Uncomment properties you need
// TimeTagComponent.propTypes = {};
// TimeTagComponent.defaultProps = {};

export default TimeTagComponent;
