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
  render() {
    return (
      <div className="timetag-component">
        { this.state.hour } {':'} { this.state.minute }
      </div>
    );
  }
}

TimeTagComponent.displayName = 'NoteTimeTagComponent';

// Uncomment properties you need
// TimeTagComponent.propTypes = {};
// TimeTagComponent.defaultProps = {};

export default TimeTagComponent;
