import createActions from './create-actions';

export const { types, actions } = createActions({
  GLANCE_AT_WEAPON: id => ({ id }),

  GLANCE_AWAY_WEAPON: () => ({}),

  SELECT_WEAPON: id => ({ id }),

  UNSELECT_WEAPON: () => ({}),

  FINISH_INITIAL_DATA_FETCH: weapons => ({ weapons })
});
