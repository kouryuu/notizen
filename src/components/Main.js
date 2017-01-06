require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Note from './note/WrapperComponent'
import NoteTitle from './note/TitleComponent'
import AddButton from './note/AddButtonComponent'

class AppComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      notes: [<Note></Note>]
    }
  }
  addNewNote(){
    let notes_array = this.state.notes;
    notes_array.push(<Note></Note>);
    this.setState({notes: notes_array});
  }
  render() {
    return (
      <div className="index">
        <NoteTitle title={ new Date().toDateString() }></NoteTitle>
        { this.state.notes }
        <AddButton clickHandler={ this.addNewNote.bind(this) }></AddButton>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
