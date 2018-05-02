import React from 'react';
import withLocalStorage from '../dist/withLocalStorage';

class Example2 extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({
      inputValue: value,
    });
  };

  render() {
    return (
      <div>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.state.inputValue}
        />
      </div>
    );
  }
}

Example2.localStorageNamespace = 'Example2';
Example2 = withLocalStorage(Example2);

export default Example2;
