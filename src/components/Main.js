require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/font-awesome/css/font-awesome.css');
import React from 'react';
import NoteTitle from './note/TitleComponent'
import AddButton from './note/AddButtonComponent'
// Classes
import store from '../stores/store.js'
// actions
import{ GET_REACT_NOTES } from '../actions/actions'
class AppComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      notes: store(GET_REACT_NOTES)
    }
  }
  addNewNote(){
    store('ADD_NOTE');
    this.setState({notes: store(GET_REACT_NOTES)});
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
