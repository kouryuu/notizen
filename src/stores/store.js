import Note from '../classes/NoteClass';
import ColorTag from '../classes/tags/ColorTagClass';
import TimeTag from '../classes/tags/TimeTagClass';
import CheckboxTag from '../classes/tags/CheckboxTagClass';
// React
import React from 'react';
import ReactNote from '../components/note/WrapperComponent'
import * as tagType from '../classes/tags/TypesOfTags';

function create_store() {
let current_tag_type = tagType.TIME_TAG;
let notes = [];
let title = new Date().toDateString();
let pageID = newPageID();
let all_pages = [];
let newPage = { pageID: pageID, title: title};
all_pages.push(newPage);
notes.push(new Note(0, createNewTag(current_tag_type)));
  return function(action, ...args) {
    switch (action) {
      case 'ADD_NOTE':
          let new_tag = createNewTag(current_tag_type);
          let next_id  = notes.length;
          notes.push(new Note(next_id, new_tag));
          return notes;
      case 'CHANGE_CURRENT_TAG_TYPE':
        current_tag_type = args[0];
        break;
      case 'GET_NOTES':
        return notes;
      case 'GET_REACT_NOTES':
        let react_notes_array = [];
        notes.map(function(note){
          react_notes_array.push(<ReactNote key={note.getID()} body={note.getBody()} tag={note.getTag()} id={note.getID()}></ReactNote>);
        });
        return react_notes_array;
      case 'CHANGE_NOTE_TAG_TYPE':
        notes[args[0]].changeTag(createNewTag(args[1]));
        break;
      case 'REPLACE_TAG':
        notes[args[0]].changeTag(args[1]);
        break;
      case 'GET_NOTE_TAG':
        return notes[args[0]].getTag();
      case 'CHANGE_BODY':
        notes[args[0]].changeBody(args[1]);
        break;
      case 'GET_NOTE_BODY':
        return notes[args[0]].getBody();
      case 'CHANGE_CURRENT_PAGE_TITLE':
        title = args[0];
          return page;
        break;
      case 'GET_CURRENT_PAGE_TITLE':
        return title;
      default:
        console.error('UNKNOWN ACTION '+ action);
        return null;
      }
  }
 }
 function createNewTag(type){
   switch(type) {
      case tagType.COLOR_TAG:
        return new ColorTag();
      case tagType.TIME_TAG:
        return new TimeTag();
      case tagType.CHECKBOX_TAG:
        return new CheckboxTag();
     default:
       return new ColorTag();
   }
 }
 function newPageID() {
   return Math.round(Math.random()*1000000000)+''+ new Date().getTime();
 }
let store = create_store();
export default store;
