export default function defineStateReader(readers) {
  function StateReader(state) {
    this.state = state;
  }

  Object.keys(readers).forEach(name => {
    const read = readers[name];
    StateReader.prototype[name] = function(...args) {
      return read(this.state, ...args);
    };
  });

  return StateReader;
}
