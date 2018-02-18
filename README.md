## 🔥 react-localstorage-sync 🔥

This is a small utility that will help you solve your applications data persistence needs.

At the heart this is a higher order component which hooks itself to the Component that is wrapped in it.


### Examples 🎉

You have a component with an implementation like this:
```js
  import React, { Component } from 'react';

  class SomeComponent extends Component {
    state = {
      tick: 1,
      tock: 1,
    }

    increaseStateCount = (keyName) => {
      this.setState({
        [keyName]: this.state[keyName] + 1,
      });
    }

    render() {
      const { tick, tock } = this.state;
      return (
        <div>
          <div
            onClick={this.increaseStateCount.bind(this, 'tick')}
          >
            Tick is {tick}
          </div>

          <div
            onClick={this.increaseStateCount.bind(this, 'tock')}
          >
            Tock is {tock}
          </div>
        </div>
      );
    }
  }

  export default SomeComponent;
```

You can quickly add persistence to the state by following 4 steps:

0. Import `withLocalStorage` and wrap it on your component.

```js
  import withLocalStorage from 'react-localstorage-sync';
  ...
  SomeComponent = withLocalStorage(SomeComponent);
```

1. Tell which state keys to persist in the localStorage and under what namespace
```js
  SomeComponent.localStorageNamespace = 'SomeComponent';

  SomeComponent.localStorageKeys = ['tick', 'tock'];
```

2. Get saved state from localStorage when component mounts.
```js
  componentDidMount() {
    this.setState(this.getStateFromLocalStorage(this));
  }
```

3. Dance. 👯👯‍♂️

### Your component now looks like this:

```js
  import React, { Component } from 'react';
  import withLocalStorage from 'react-localstorage-sync';

  class SomeComponent extends Component {
    state = {
      tick: 1,
      tock: 1,
    }

    componentDidMount() {
      this.setState(this.getStateFromLocalStorage(this));
    }

    increaseStateCount = (keyName) => {
      this.setState({
        [keyName]: this.state[keyName] + 1,
      });
    }

    render() {
      const { tick, tock } = this.state;
      return (
        <div>
          <div
            onClick={this.increaseStateCount.bind(this, 'tick')}
          >
            Tick is {tick}
          </div>

          <div
            onClick={this.increaseStateCount.bind(this, 'tock')}
          >
            Tock is {tock}
          </div>
        </div>
      );
    }
  }

  SomeComponent.localStorageKeys = ['tick', 'tock'];
  SomeComponent.localStorageNamespace = 'SomeComponent';

  SomeComponent = withLocalStorage(SomeComponent);

  export default SomeComponent;
```
