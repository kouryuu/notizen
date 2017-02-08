'use strict';

import React from 'react';
import Body from './BodyComponent';
import Tag from './TagComponent';
import Settings from './NoteSettingsComponent';
require('styles/note/Wrapper.css');
import * as TagType from '../../classes/tags/TypesOfTags'
import store from '../../stores/store.js'
class WrapperComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      tag: '',
      deleted: false
    }
  }
  componentDidMount() {
    this.setState({tag: store('GET_NOTE_TAG',this.props.id)});
    this.setState({deleted: this.props.deleted});
  }
  changeToTimeTag() {
    store('CHANGE_NOTE_TAG_TYPE', this.props.id, TagType.TIME_TAG)
    store('CHANGE_CURRENT_TAG_TYPE',TagType.TIME_TAG);
    this.setState({tag: store('GET_NOTE_TAG',this.props.id)});
  }
  changeToColorTag() {
    store('CHANGE_NOTE_TAG_TYPE', this.props.id, TagType.COLOR_TAG)
    store('CHANGE_CURRENT_TAG_TYPE',TagType.COLOR_TAG);
    this.setState({tag: store('GET_NOTE_TAG',this.props.id)});
  }
  changeToCheckboxTag() {
    store('CHANGE_NOTE_TAG_TYPE', this.props.id, TagType.CHECKBOX_TAG)
    store('CHANGE_CURRENT_TAG_TYPE',TagType.CHECKBOX_TAG);
    this.setState({tag: store('GET_NOTE_TAG',this.props.id)});
  }
  deleteMe() {
    this.setState({deleted: true});
  }
  render() {
    return (
      <div className="wrapper-component" hidden={(this.state.deleted)? 'true': ''}>
        <Tag tag={ this.state.tag } id={ this.props.id }></Tag>
        <Body text={ this.props.body } id={ this.props.id }></Body>
        <Settings changeToTimeTag={ this.changeToTimeTag.bind(this) }
            changeToColorTag={ this.changeToColorTag.bind(this) }
            changeToCheckboxTag={ this.changeToCheckboxTag.bind(this) }
            deleteMe={ this.deleteMe.bind(this) } >
        </Settings>
      </div>
    );
  }
}

WrapperComponent.displayName = 'NoteWrapperComponent';

// Uncomment properties you need
// WrapperComponent.propTypes = {};
// WrapperComponent.defaultProps = {};

export default WrapperComponent;
