/**
 * StateReader is a readonly interface for the state.
 */
export default class StateReader {
  constructor(state) {
    this.state = state;
    this.getWeapon = this.getWeapon.bind(this);
  }
}
