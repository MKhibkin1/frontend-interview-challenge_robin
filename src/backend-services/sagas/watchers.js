import { takeLatest } from 'redux-saga/effects';
import * as userSagas from './user'
import * as types from '../actions';

export function* watchFilterUser() {
  yield takeLatest(types.LOAD_USER_MEETINGS, userSagas.loadUserMeetings)
}
