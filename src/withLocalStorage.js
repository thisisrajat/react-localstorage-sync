import React from 'react';
import { noop, pick, getNamespace } from './utils';


function withLocalStorage(WrapperComponent, options) {
  const keysToSync = WrapperComponent.localStorageKeys;

  function localStorageMiddleWare (callback, _this) {
    const stateObj = pick(_this.state, keysToSync);
    const namespace = getNamespace(WrapperComponent, _this);
    try {
      localStorage.setItem(namespace, JSON.stringify(stateObj));
    } catch (e) {
      console.error(e);
    }
    callback.call(_this);
  }

  return class LocalStorageWrapper extends React.Component {
    getStateFromLocalStorage(reference) {
      const namespace = getNamespace(WrapperComponent, reference);
      return (
        JSON.parse(localStorage.getItem(namespace))
      );
    }

    setUp (ref) {
      const originalSetState = ref.setState;

      // Override child's setState
      ref.setState = function(stateObj, callback = noop) {
        originalSetState.call(
          // Preserve this for setState
          ref,
          // Merge the original stateObject
          stateObj,
          // Call custom middleware that syncs with localStorage and
          // call the callback if any
          localStorageMiddleWare.bind(this, callback, ref)
        );
      }
    }

    render() {
      return (
        <WrapperComponent
          getStateFromLocalStorage={this.getStateFromLocalStorage}
          ref={this.setUp}
        />
      );
    }
  }
}

export default withLocalStorage;
