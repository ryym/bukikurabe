/**
 * StateReader is a readonly interface for the state.
 */
export default class StateReader {
  constructor(state) {
    this.state = state;
    this.getWeapon = this.getWeapon.bind(this);
  }

  getSelectedWeaponIDs() {
    return this.state.selectedWeaponIDs;
  }

  getMainWeapons() {
    return this.state.mainWeaponIDs.map(this.getWeapon);
  }

  getGlancedWeapon() {
    return this.getWeapon(this.state.glancedWeaponID);
  }

  getSelectedWeapons() {
    const { selectedWeaponIDs } = this.state;
    return selectedWeaponIDs.map(this.getWeapon);
  }

  getWeapon(id) {
    const { weapons } = this.state.repo;
    return weapons ? weapons[id] : weapons;
  }
}
