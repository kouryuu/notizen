'use strict';

import React from 'react';
import store from '../../stores/store';
// actions
import { GET_ALL_PAGES } from '../../actions/actions';

require('styles/note/PagesList.css');

class PagesListComponent extends React.Component {
  constructor(){
  super();
    this.state = {
      pages:[]
    }
  }
  componentDidMount() {
    console.log(store(GET_ALL_PAGES));
    this.setState({pages : store(GET_ALL_PAGES)});
  }

  render() {
    function goToPage(id) {
      console.log(id);
    }
    return (
      <div className="pages-list-component">
      <h1> Pages </h1>
        { this.state.pages.map(function(page) { return <li key={page.pageID}> <a href="#" onClick={goToPage.bind(this,page.pageID)}>{ page.title }</a></li> })}
      </div>
    );
  }
}

PagesListComponent.displayName = 'NotesPagesListComponent';

// Uncomment properties you need
// PagesListComponent.propTypes = {};
// PagesListComponent.defaultProps = {};

export default PagesListComponent;
