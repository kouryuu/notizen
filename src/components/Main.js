require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/font-awesome/css/font-awesome.css');
import React from 'react';
import Note from './note/WrapperComponent'
import NoteTitle from './note/TitleComponent'
import AddButton from './note/AddButtonComponent'

class AppComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      notes: [<Note key='1' ></Note>],
      qty_notes: 1
    }
  }
  addNewNote(){
    let notes_array = this.state.notes;
    let qty_notes = this.state.qty_notes + 1
    this.setState({qty_notes: qty_notes});
    notes_array.push(<Note key={ qty_notes }></Note>);
    this.setState({notes: notes_array});
  }
  render() {
    return (
      <div className="index">
        <NoteTitle title={ new Date().toDateString() }></NoteTitle>
        { this.state.notes }
        <div id="new-note-button">
          <AddButton clickHandler={ this.addNewNote.bind(this) }></AddButton>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
