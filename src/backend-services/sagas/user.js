import { put, call, all} from 'redux-saga/effects';

import services from '../services'
import * as types from '../actions'

export function* loadUserMeetings(){
  try{
    //Display Loading state
    yield put({type: types.MEETING_LOAD_STATUS, payload: true})
    let meetings = yield call(services.user.fetchUserMeetings)

    yield all([
      put({type: types.SET_USER_MEETINGS, payload: meetings}),
      put({type: types.MEETING_LOAD_STATUS, payload: false}),
      put({type: types.MEETING_LOAD_OUTCOME, payload: types.REQUEST_SUCCESS})
    ])

  }catch(error){

    yield all([
      put({type: types.MEETING_LOAD_OUTCOME, payload: types.REQUEST_FAILURE}),
      put({type: types.MEETING_LOAD_STATUS, payload: false}),
    ])

    console.log(error)
  }
}