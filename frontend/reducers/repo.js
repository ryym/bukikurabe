import { types } from '../actions';

const initialState = {
  mainWeapons: {},
  subWeapons: {},
  specialWeapons: {},
  weaponTypes: {},
};

function arrayToObject(array, keyProp = 'id') {
  return array.reduce((o, row) => {
    o[row[keyProp]] = row;
    return o;
  }, {});
}

export const repo = (state = initialState, { type, params }) => {
  switch (type) {
    case types.INITIAL_DATA_FETCHED: {
      return {
        mainWeapons: arrayToObject(params.mainWeapons),
        subWeapons: arrayToObject(params.subWeapons),
        specialWeapons: arrayToObject(params.specialWeapons),
        weaponTypes: arrayToObject(params.weaponTypes),
      };
    }
    default: {
      return state;
    }
  }
};
