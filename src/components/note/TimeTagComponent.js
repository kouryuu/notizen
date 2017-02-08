'use strict';

import React from 'react';
import AddButton from './AddButtonComponent'
import RemoveButton from './RemoveButtonComponent'
import store from '../../stores/store.js'

require('styles/note/TimeTag.css');

class TimeTagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: '',
      minutes: '',
      controlsDisplayed: {
          display: 'none'
        }
    };
  }
  componentDidMount() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    this.setState({hours: tag.getHours(),minutes: tag.getMinutes()});
  }
  zeroedNumber(number) {
    return (parseInt(number) > 9)?number:'0'+number;
  }
  increaseHour() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    tag.increaseHour();
    store('REPLACE_TAG',this.props.id,tag);
    this.setState({hours: tag.getHours()});
  }
  increaseMinute() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    tag.increaseMinute();
    store('REPLACE_TAG',this.props.id,tag);
    this.setState({minutes: tag.getMinutes()});
  }
  decreaseHour() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    tag.decreaseHour();
    store('REPLACE_TAG',this.props.id,tag);
    this.setState({hours: tag.getHours()});
  }
  decreaseMinute() {
    let tag = store('GET_NOTE_TAG',this.props.id);
    tag.decreaseMinute();
    store('REPLACE_TAG',this.props.id,tag);
    this.setState({minutes: tag.getMinutes()});
  }
  render() {
    let toggleControls= function(event) {
      event.preventDefault();
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
          { this.zeroedNumber(this.state.hours) } {':'} { this.zeroedNumber(this.state.minutes) }
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
