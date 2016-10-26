import { types } from '../actions';

export const repo = (state = {}, { type, params }) => {
  switch (type) {
    case types.FINISH_INITIAL_DATA_FETCH: {
      const weapons = params.weapons.reduce((m, weapon) => {
        m[weapon.id] = weapon;
        return m;
      }, {});
      return { weapons };
    }
    default: {
      return state;
    }
  }
};
