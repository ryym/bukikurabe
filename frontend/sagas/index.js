import { types, actions } from '../actions';
import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as api from '../lib/api';

function* fetchInitialData() {
  const weaponData = yield call(api.fetchInitialData);
  yield put(actions.INITIAL_DATA_FETCHED(weaponData));
}

export default function* rootSaga() {
  yield takeEvery(types.REQUEST_INITIAL_DATA, fetchInitialData);
}
