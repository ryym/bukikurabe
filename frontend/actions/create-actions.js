function createTypes(definitions) {
  return Object.keys(definitions).reduce((types, type) => {
    return { [type]: type, ...types };
  }, {});
}

function createActionCreators(definitions) {
  return Object.keys(definitions).reduce((creators, type) => {
    creators[type] = (...args) => {
      const action = definitions[type](...args);
      action.type = type;
      return action;
    };
    return creators;
  }, {});
}

export default function createActions(definitions) {
  return {
    actions: createActionCreators(definitions),
    types: createTypes(definitions),
  };
}
