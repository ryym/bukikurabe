export function getSelectedWeaponIDs(state) {
  return state.selectedWeaponIDs;
}

export function getMainWeapons(state) {
  return getWeapons(state, state.mainWeaponIDs);
}

export function getGlancedWeapon(state) {
  return getWeapons(state, [state.glancedWeaponID])[0];
}

export function getSelectedWeapons(state) {
  return getWeapons(state, state.selectedWeaponIDs);
}

function getWeapons(state, ids) {
  const { weapons } = state.repo;
  return weapons ? ids.map(id => weapons[id]) : [];
}
