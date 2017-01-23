'use strict';

/*
 * action types
 */

export const UPDATE_TEXT = 'UPDATE_TEXT'
export const CHANGE_LABEL_TYPE = 'CHANGE_LABEL_TYPE'


/*
 * action creators
 */

export function updateText(text) {
  return { type: UPDATE_TEXT, text }
}
export function changeLabelType(type) {
  return { type: UPDATE_TEXT, type }
}
