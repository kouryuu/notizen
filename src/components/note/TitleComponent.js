'use strict';

import React from 'react';

require('styles/note/Title.css');

class TitleComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
  }
  ChangeValue(event) {
    this.setState({title:event.target.value});
  }

  render() {
    return (
      <div>
      <input type="text" className="title-component" placeholder={ this.props.title } value={ this.state.title } onChange={ this.ChangeValue } />
      </div>
    );
  }
}

TitleComponent.displayName = 'NoteTitleComponent';

// Uncomment properties you need
// TitleComponent.propTypes = {};
// TitleComponent.defaultProps = {};

export default TitleComponent;
