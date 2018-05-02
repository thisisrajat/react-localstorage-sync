import React from 'react';
import { noop, syncToLocalStorage, getFromLocalStorage } from './utils';

function withLocalStorage(WrapperComponent, options) {
  const originalDidUpdate = WrapperComponent.prototype.componentDidUpdate || noop;
  let WrapperInstance = null;

  WrapperComponent.prototype.componentDidUpdate = function(...args) {
    originalDidUpdate.apply(WrapperInstance, args);
    syncToLocalStorage(WrapperComponent, WrapperInstance);
  }

  return class LocalStorageWrapper extends React.Component {
    static displayName = `LocalStorageWrapper(${WrapperComponent.name || WrapperComponent.displayName})`;

    componentDidMount() {
      syncToLocalStorage(WrapperComponent, WrapperInstance);
    }

    componentWillUnmount() {
      syncToLocalStorage(WrapperComponent, WrapperInstance);
    }

    setupChildRef = (ref) => {
      WrapperInstance = ref;
    }

    getStateFromLocalStorage = () => {
      return getFromLocalStorage(WrapperComponent, WrapperInstance);
    }

    render() {
      return (
        <WrapperComponent
          ref={this.setupChildRef}
          getStateFromLocalStorage={this.getStateFromLocalStorage}
          {...this.props}
        />
      );
    }
  }
}

export default withLocalStorage;
