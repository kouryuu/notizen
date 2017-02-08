'use strict';

import React from 'react';
import store from '../../stores/store.js'

require('styles/note/Title.css');

class TitleComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
  }
  componentDidMount() {
    this.setState({title: store('GET_CURRENT_PAGE_TITLE')});
  }
  ChangeValue(event) {
    store('CHANGE_CURRENT_PAGE_TITLE',event.target.value);
    this.setState({title: store('GET_CURRENT_PAGE_TITLE')});
  }

  render() {
    return (
      <div>
      <input type="text" className="title-component" placeholder={ 'Give me a title.' } value={ this.state.title } onChange={ this.ChangeValue.bind(this) } />
      </div>
    );
  }
}

TitleComponent.displayName = 'NoteTitleComponent';

// Uncomment properties you need
// TitleComponent.propTypes = {};
// TitleComponent.defaultProps = {};

export default TitleComponent;
