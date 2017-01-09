'use strict';

import React from 'react';

require('styles/note/TimeTag.css');

class TimeTagComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    };
  }
  zeroedNumber(number) {
    return (parseInt(number) > 9)?number:'0'+number;
  }
  render() {
    return (
      <div className="timetag-component-wrapper">
        <div className="timertag-component" onClick={ this.toggleControls() }>
          { this.zeroedNumber(this.state.hour) } {':'} { this.zeroedNumber(this.state.minute) }
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
