import { put, call, all} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'

import services from 'backend-services/services'

import * as types from '../actions'

export function* registerNewUser(payload) {
  try{
    const registerStatus = yield call(services.user.registerUserService, payload)

    if(registerStatus === 200){
      const [firstName, images] = yield all([
        call( services.user.fetchUserInformation, {fields: ["first_name"]}),
        call( services.user.fetchUserImages )
      ])
  
      yield all([
        put({type: types.SET_USER_NAME, data: firstName}),
        put({type: types.SET_USER_IMAGES, images}),
        put({ type: types.LOGIN_USER_SUCCESS})
      ])
    }

  }catch(error){
    console.log(error)
  }
}

export function* setActiveUserFilter(payload){
  try{

  }catch(error){
    console.log(error)
  }


}