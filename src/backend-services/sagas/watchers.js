import { takeLatest } from 'redux-saga/effects';
import * as userSagas from './user'
import * as types from '../actions';

export function* watchFilterUser() {
  yield takeLatest(types.REGISTER_USER, userSagas.registerNewUser);
  yield takeLatest(types.LOGIN_USER, userSagas.loginUser);
}
