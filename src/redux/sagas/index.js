import { all } from 'redux-saga/effects';
import markerSaga from './marker-saga';

export default function* rootSaga() {
  yield all([
    markerSaga(),
  ]);
};