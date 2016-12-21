require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Note from './note/WrapperComponent'
import NoteTitle from './note/TitleComponent'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <NoteTitle title={ new Date().toDateString() }></NoteTitle>
        <Note ></Note>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
