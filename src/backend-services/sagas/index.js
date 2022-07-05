import { fork , spawn, call, all} from 'redux-saga/effects';
import * as watchers from './watchers'

const sagas = [
  watchers.watchFilterUser,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}