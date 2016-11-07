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
  return Object.keys(state.repo.mainWeapons).length > 0
    ? ids.map(id => getWeapon(state, id))
    : [];
}

// XXX: 色んなところでオブジェクトを共有する感じになるから、Immutableにしたい
export function getWeapon(state, id) {
  const { mainWeapons, subWeapons, specialWeapons, weaponTypes } = state.repo;
  const main = mainWeapons[id];
  if (main) {
    main.subWeapon = subWeapons[main.subWeaponId];
    main.specialWeapon = specialWeapons[main.specialWeaponId];
    main.weaponType = weaponTypes[main.weaponTypeId];
  }
  return main;
}
