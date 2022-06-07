import { put, all, select, takeEvery, call, delay } from 'redux-saga/effects';

import * as actions from '../actions';
import { navigationRef } from '../../navigation/AppNavigator';

function* addMarker({ payload }) {
  try {
    console.log(payload);
    yield put(actions.setMarkersAction(payload));
  } catch (e) {
    console.log(e);
  } finally {
  }
}

function* deleteMarker({ payload }) {
  try {
    console.log('Deleting ', payload, ' element');
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export default function* markersSagas() {
  yield all([
    takeEvery(actions.addMarkerAction, addMarker),
    takeEvery(actions.deleteMarkerAction, deleteMarker),
  ]);
}
