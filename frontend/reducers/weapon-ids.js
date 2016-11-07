import { types } from '../actions';

export const glancedWeaponID = (weaponID = null, { type, params, reader }) => {
  switch (type) {
    case types.GLANCE_AT_WEAPON: {
      const selectedID = reader.getSelectedWeaponIDs()[0];
      if (selectedID && selectedID === params.id) {
        return weaponID;
      }
      return params.id;
    }
    case types.GLANCE_AWAY_WEAPON:
    case types.SELECT_WEAPON: {
      return null;
    }
    default: {
      return weaponID;
    }
  }
};

export const selectedWeaponIDs = (ids = [], { type, params }) => {
  switch (type) {
    case types.SELECT_WEAPON: {
      return ids.concat(params.id);
    }
    case types.UNSELECT_WEAPON: {
      return ids.slice(0, ids.length - 1);
    }
    default: {
      return ids;
    }
  }
};

export const mainWeaponIDs = (ids = [], { type, params }) => {
  switch (type) {
    case types.INITIAL_DATA_FETCHED: {
      return params.mainWeapons.map(w => w.id);
    }
    default: {
      return ids;
    }
  }
};

