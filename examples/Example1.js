import React from 'react';
import withLocalStorage from '../dist/withLocalStorage';

class Example1 extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate() {
    const { tick, tock } = this.state;
    const which = (tick + tock) % 2 ? true : false;

    setTimeout(() => {
      this.setState({
        tick: which ? tick + 1 : tick,
        tock: which ? tock : tock + 1,
      });
    }, 1000);
  }

  componentDidMount() {
    const { tick, tock } = this.state;

    this.setState({
      tick: 1,
      tock: 0,
    });
  }

  render() {
    return (
      <div>
        <div>Tick is {this.state.tick}</div>
        <div>Tock is {this.state.tock}</div>
      </div>
    );
  }
}

Example1.localStorageNamespace = 'Example1';
Example1.localStorageKeys = ['tick', 'tock'];
Example1 = withLocalStorage(Example1);

export default Example1;
