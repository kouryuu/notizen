import Note from '../classes/NoteClass';
import ColorTag from '../classes/tags/ColorTagClass';
import TimeTag from '../classes/tags/TimeTagClass';
import CheckboxTag from '../classes/tags/CheckboxTagClass';
// React
import React from 'react';
import ReactNote from '../components/note/WrapperComponent';
// Constants
import * as tagType from '../classes/tags/TypesOfTags';

// LocalStorage lib
import Lockr from 'lockr'

import * as actions from '../actions/actions';

function create_store() {
let current_tag_type = tagType.TIME_TAG;
let notes = [];
let title = new Date().toDateString();
let pageID = newPageID();
let all_pages = Lockr.get('pages') == null?[]:Lockr.get('pages');
let newPage = { pageID: pageID, title: title};
all_pages.push(newPage);
Lockr.set('pages', all_pages);
notes.push(new Note(0, createNewTag(current_tag_type)));

  return function(action, ...args) {
    Lockr.set(pageID, notes);
    switch (action) {
      case actions.ADD_NOTE:
          let new_tag = createNewTag(current_tag_type);
          let next_id  = notes.length;
          notes.push(new Note(next_id, new_tag));
          return notes;
      case actions.CHANGE_CURRENT_TAG_TYPE:
        current_tag_type = args[0];
        break;
      case actions.GET_NOTES:
        return notes;
      case actions.GET_REACT_NOTES:
        let react_notes_array = [];
        notes.map(function(note){
          react_notes_array.push(
            <ReactNote key={note.getID()} body={note.getBody()} tag={note.getTag()} id={note.getID()}>
            </ReactNote>);
        });
        return react_notes_array;
      case actions.CHANGE_NOTE_TAG_TYPE:
        notes[args[0]].changeTag(createNewTag(args[1]));
        break;
      case actions.REPLACE_TAG:
        notes[args[0]].changeTag(args[1]);
        break;
      case actions.GET_NOTE_TAG:
        return notes[args[0]].getTag();
      case actions.CHANGE_BODY:
        notes[args[0]].changeBody(args[1]);
        break;
      case actions.GET_NOTE_BODY:
        return notes[args[0]].getBody();
      case actions.CHANGE_CURRENT_PAGE_TITLE:
        title = args[0];
        Lockr.set('pages', all_pages.map(function(page) {
          if(page.pageID == pageID) {
            page.title = title;
          }
          return page;
        }));
        break;
      case actions.GET_CURRENT_PAGE_TITLE:
        return title;
      case actions.GET_ALL_PAGES:
        return Lockr.get('pages');
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
