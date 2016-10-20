
const _methodsNotToBeBound = {
  constructor: true,
  render: true,
};

export function bindMethodContext(object) {
  Object
    .getOwnPropertyNames(object.constructor.prototype)
    .filter(name => !_methodsNotToBeBound[name])
    .forEach(name => {
      object[name] = object[name].bind(object);
    });
}
