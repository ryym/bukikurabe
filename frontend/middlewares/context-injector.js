
function extractParams(action) {
  return Object.keys(action).reduce((params, key) => {
    if (key !== 'type') {
      params[key] = action[key];
    }
    return params;
  }, {});
}

/**
 * A Redux middleware to share some context with all reducers.
 * this transform an action like below:
 *   - IN: { type: 'GET_FOO', id: 1 },
 *   - OUT: { type: 'GET_FOO', params: { id: 1 }, context: context }
 * `getContext` is called for each dispatch.
 */
export default function contextInjector(getContext) {
  return store => next => action => {
    const context = getContext(store.getState(), action);
    const wrappedAction = {
      type: action.type,
      params: extractParams(action),
      ...context
    };
    next(wrappedAction);
  };
}
