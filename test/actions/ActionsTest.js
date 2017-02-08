/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import * as action from 'actions/actions';


describe('Action constants mapping', () => {
  it('should have ADD_NOTE action', () => {
    expect(action.ADD_NOTE).to.equal('ADD_NOTE');
  });
  it('should have CHANGE_CURRENT_TAG_TYPE action',()=>{
    expect(action.CHANGE_CURRENT_TAG_TYPE).to.equal('CHANGE_CURRENT_TAG_TYPE');
  });
  it('should have GET_NOTES action',()=>{
    expect(action.GET_NOTES).to.equal('GET_NOTES');
  });
  it('should have GET_REACT_NOTES action',()=>{
    expect(action.GET_REACT_NOTES).to.equal('GET_REACT_NOTES');
  });
  it('should have CHANGE_NOTE_TAG_TYPE action',()=>{
    expect(action.CHANGE_NOTE_TAG_TYPE).to.equal('CHANGE_NOTE_TAG_TYPE');
  });
  it('should have REPLACE_TAG action',()=>{
    expect(action.REPLACE_TAG).to.equal('REPLACE_TAG');
  });
  it('should have GET_NOTE_TAG action',()=>{
    expect(action.GET_NOTE_TAG).to.equal('GET_NOTE_TAG');
  });
  it('should have CHANGE_BODY action',()=>{
    expect(action.CHANGE_BODY).to.equal('CHANGE_BODY');
  });
  it('should have GET_NOTE_BODY action',()=>{
    expect(action.GET_NOTE_BODY).to.equal('GET_NOTE_BODY');
  });
  it('should have CHANGE_CURRENT_PAGE_TITLE action',()=>{
    expect(action.CHANGE_CURRENT_PAGE_TITLE).to.equal('CHANGE_CURRENT_PAGE_TITLE');
  });
  it('should have GET_CURRENT_PAGE_TITLE action',()=>{
    expect(action.GET_CURRENT_PAGE_TITLE).to.equal('GET_CURRENT_PAGE_TITLE');
  });
});
