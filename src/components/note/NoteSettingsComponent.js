'use strict';

import React from 'react';

require('styles/note/NoteSettings.css');

class NoteSettingsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showSettings: {
        display: 'none'
      }
    };
  }
  showSettings() {
    if( this.state.showSettings.display == 'none'){
      this.setState({ showSettings: { display: 'flex'} });
    }
    if( this.state.showSettings.display == 'flex'){
      this.setState({showSettings: {display: 'none'}});
    }
  }
  render() {
    return (
      <div className="notesettings-component">
        <a href="#" onClick={ this.showSettings.bind(this) } >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </a>
        <div className="notesettings-hidden" style={ this.state.showSettings } >
          <a href="#" onClick={ this.props.trashMe } >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
          <a href="#" onClick={ this.props.changeToTimeTag } >
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </a>
          <a href="#" onClick={ this.props.changeToColorTag } >
            <i className="fa fa-paint-brush" aria-hidden="true"></i>
          </a>
          <a href="#" onClick={ this.props.changeToCheckboxTag } >
            <i className="fa fa-list" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  }
}

NoteSettingsComponent.displayName = 'NoteNoteSettingsComponent';

// Uncomment properties you need
// NoteSettingsComponent.propTypes = {};
// NoteSettingsComponent.defaultProps = {};

export default NoteSettingsComponent;
