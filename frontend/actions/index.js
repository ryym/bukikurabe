import createActions from './create-actions';

export const { types, actions } = createActions({
  GLANCE_AT_WEAPON: id => ({ id }),

  GLANCE_AWAY_WEAPON: () => ({}),

  SELECT_WEAPON: id => ({ id }),

  UNSELECT_WEAPON: () => ({}),

  REQUEST_INITIAL_DATA: () => ({}),

  INITIAL_DATA_FETCHED: weaponsData => weaponsData,
});
