import React from 'react';
import ReactDOM from 'react-dom';
import withLocalStorage from '../dist/withLocalStorage';

import Example1 from './Example1';
import Example2 from './Example2';

class AppController extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Example1 />
        <Example2 />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<AppController />, document.querySelector('#root'));
