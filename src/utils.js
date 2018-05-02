export function noop () {}

function pick (obj = {}, keys) {
  const newObj = {};
  keys.forEach((key) => {
    newObj[key] = obj[key];
  });
  return newObj;
}

function getNamespace(wrapper, wrapperInstance) {
  if (typeof wrapper.localStorageNamespace === 'string') {
    return wrapper.localStorageNamespace;
  }

  if (typeof wrapper.localStorageNamespace === 'function') {
    const { state, props } = wrapperInstance;
    return wrapper.localStorageNamespace(state, props);
  }

  const name = wrapper.name || wrapper.displayName;
  if (!name) {
    console.error('Namespace is missing for the wrapped component. Make sure your component has localStorageNamespace present.');
    return 'undefinedNamespace';
  }

  return name;
}

function getLocalStorageKeys(wrapper, wrapperInstance) {
  // 1. If localStorageKeys are not present, we'll sync
  // everything
  if (typeof wrapper.localStorageKeys === 'undefined') {
    return Object.keys(wrapperInstance.state);
  }

  // 2. If it's a function then we'll pass state and props and
  // get keys back
  if (typeof wrapper.localStorageKeys === 'function') {
    const { state, props } = wrapperInstance;
    const keys = wrapper.localStorageKeys(state, props);
    return keys;
  }

  return wrapper.localStorageKeys;
}

export function syncToLocalStorage(wrapper, wrapperInstance) {
  if (typeof window === 'undefined') {
    return;
  }

  const stateKeysToSync = getLocalStorageKeys(wrapper, wrapperInstance);
  const namespace = getNamespace(wrapper, wrapperInstance);

  try {
    const subState = pick(wrapperInstance.state, stateKeysToSync);
    localStorage.setItem(namespace, JSON.stringify(subState));
  } catch (err) {
    console.error(err);
  }
}

export function getFromLocalStorage(wrapper, wrapperInstance) {
  if (typeof window === 'undefined') {
    return {};
  }
  const namespace = getNamespace(wrapper, wrapperInstance);

  try {
    return localStorage.getItem(namespace);
  } catch (err) {
    console.error(err);
    return {};
  }
}
