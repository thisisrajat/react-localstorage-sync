import React, { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLocalStorage from '../src/withLocalStorage';

window.localStorage = {
  store: {},
  setItem(key, value) {
    this.store[key] = value;
  },
  getItem(key) {
    return this.store[key];
  },
  clear() {
    this.store = {};
  }
};

Enzyme.configure({ adapter: new Adapter() })

function getComponent(namespace, keys) {
  class SomeComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
      };
      this.fooAction = this.handleAction.bind(this, 'foo', 'RandomValue');
      this.barAction = this.handleAction.bind(this, 'bar', {
        hello: 'world',
      });
      this.bazAction = this.handleAction.bind(this, 'baz', [1, 2, 3,4, 5]);
    }

    handleAction(key, value) {
      this.setState({
        [key]: value,
      })
    }

    increaseCount() {
      this.setState({
        count: this.state.count + 1,
      });
    }

    render() {
      return (
        <div>
          <div id="count" onClick={this.increaseCount.bind(this)} />
          <div id="foo" onClick={this.fooAction} />
          <div id="bar" onClick={this.barAction} />
          <div id="baz" onClick={this.bazAction} />
        </div>
      );
    }
  };
  SomeComponent.localStorageNamespace = namespace;
  SomeComponent.localStorageKeys = keys;
  const pure = SomeComponent;
  const extended = withLocalStorage(SomeComponent);
  return { extended, pure };
}

describe('withLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders the original component', () => {
    const { pure: SomeComponent, extended: WrappedSomeComponent } = getComponent('SomeComponent');

    const wrap = mount(<WrappedSomeComponent />);

    expect(wrap).toHaveLength(1);
    expect(wrap.find('SomeComponent')).toHaveLength(1);
  });

  test('syncs the state data', () => {
    const { pure: SomeComponent, extended: WrappedSomeComponent } = getComponent('SomeComponent', ['count']);

    const wrap = mount(<WrappedSomeComponent />);

    wrap.find('#count').simulate('click');
    wrap.find('#count').simulate('click');
    wrap.find('#count').simulate('click');

    expect(localStorage.store).toHaveProperty('SomeComponent');

    const data = JSON.parse(localStorage.store['SomeComponent']);

    expect(data).toHaveProperty('count');
    expect(data.count).toEqual(3);
  });

  test('syncs all keys when keys are not defined', () => {
    const { pure: SomeComponent, extended: WrappedSomeComponent } = getComponent('SomeComponent');

    const wrap = mount(<WrappedSomeComponent />);

    wrap.find('#count').simulate('click');
    wrap.find('#foo').simulate('click');
    wrap.find('#bar').simulate('click');
    wrap.find('#baz').simulate('click');

    const data = JSON.parse(localStorage.store['SomeComponent']);
    expect(Object.keys(data)).toEqual(['count', 'foo', 'bar', 'baz']);
  });
});

