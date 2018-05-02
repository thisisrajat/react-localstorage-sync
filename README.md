## 🔥 react-localstorage-sync 🔥

This is a utility to help you with your applications data persistence needs.

At the heart this is a higher order component which hooks itself to the Component that is wrapped in it.

### What does it do 🤔:
It takes any component's state -- which is enhanced with this utility -- and persists it to localstorage. You can choose to sync all the keys present in your state object or a subset. Everything is synced to localstorage under a namespace which you can define on a component or instance level.

### Examples 🎉

You have a component with an implementation like this:

```js
import React, { Component } from 'react';

class SomeComponent extends Component {
  constructor(...args) {
    super(...args);
    state = {
      tick: 1,
      tock: 1,
    };
  }

  increaseStateCount = keyName => {
    this.setState({
      [keyName]: this.state[keyName] + 1,
    });
  };

  render() {
    const { tick, tock } = this.state;
    return (
      <div>
        <div onClick={this.increaseStateCount.bind(this, 'tick')}>
          Tick is {tick}
        </div>

        <div onClick={this.increaseStateCount.bind(this, 'tock')}>
          Tock is {tock}
        </div>
      </div>
    );
  }
}

export default SomeComponent;
```

You can quickly add persistence to the state by following 4 steps:

0.  Import `withLocalStorage` and wrap it on your component.

```js
  import withLocalStorage from 'react-localstorage-sync';
  ...
  SomeComponent = withLocalStorage(SomeComponent);
  export default SomeComponent;
```

1.  Tell which state keys to persist in the localStorage and under which namespace

```js
/* Namespace for the keys in localStorage */
SomeComponent.localStorageNamespace = 'SomeComponent';

/* Keys that needs persistence */
SomeComponent.localStorageKeys = ['tick', 'tock'];

SomeComponent = withLocalStorage(SomeComponent);
export default SomeComponent;
```

2.  Get saved state from localStorage when component constructs or mounts.
```js
  class SomeComponent extends Component {
    constructor(props) {
      super(props);
      state = this.props.getStateFromLocalStorage();
    }
    ...
    ...
    componentDidMount() {
      this.setState(this.props.getStateFromLocalStorage());
    }
    ...
    ...
  }
```

3.  Dance. 👯👯‍♂️

### Your component now looks like this:

```js
import React, { Component } from 'react';
import withLocalStorage from 'react-localstorage-sync';

class SomeComponent extends Component {
  /* I chose to keep the constructor implementation here
    instead of componentDidMount.
  */
  constructor(...args) {
    this.state = this.props.getStateFromLocalStorage();
  }

  increaseStateCount = keyName => {
    this.setState({
      [keyName]: this.state[keyName] + 1,
    });
  };

  render() {
    const { tick, tock } = this.state;
    return (
      <div>
        <div onClick={this.increaseStateCount.bind(this, 'tick')}>
          Tick is {tick}
        </div>

        <div onClick={this.increaseStateCount.bind(this, 'tock')}>
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

### Reference:

#### localStorageKeys:
This is a static property on the class Components. `localStorageKeys` can take 3 possible values: `undefined`, `array` or a `function`.

- `undefined`: Don't define `localStorageKeys` at all. The default behavior is to sync everything in the state object.
- `array`: Give an array of keys to sync to `localStorage`. Most of the times we don't want all of our keys to be synced. This helps with that.
```js
  class A extends Component {}
  A.localStorageKeys = ['key1', 'key2', 'key3'];
```
- `function`: You can choose to implement a function which returns all the keys. This function takes in 2 arguments -- `props` and `state`.

#### localStorageNamespace:
This is a static property on the class Components. `localStorageNamespace` can take 2 possible values: `string` or a `function`. This is the key under which all the data is stored for this component instance.

__IMPORTANT:__  Make sure your namespace is unique across different instances. That means, if you have a component called `Checkbox` and your namespace name is also `Checkbox`, if you try to render two `Checkbox` on the same page, they might cause race conditions and will incorrectly update the localStorage within the same namespace. To handle this case, use the functional `localStorageNamespace`.
- `string`: This is static property. Can we anything ingenious like components name etc.
- `function`: You can choose to implement a function which returns a string. This function takes in 2 arguments -- `props` and `state` to deduce the namespace.


### TODO:
- Add more unit tests
- Add End To End Cypress tests
- Add travis badge and build
- Add `CONTRIBUTING.md` file
- Publish flow types
- Keep components in sync across tabs


