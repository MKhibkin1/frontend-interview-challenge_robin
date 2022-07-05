import * as user from './user'

export const SET_ACTIVE_FILTER_USER = "SET_ACTIVE_FILTER_USER"

//Setting user meetings
export const LOAD_USER_MEETINGS = "LOAD_USER_MEETINGS" 
export const MEETING_LOAD_STATUS = "MEETING_LOAD_STATUS"
export const MEETING_LOAD_OUTCOME = "MEETING_LOAD_OUTCOME"

export const SET_USER_MEETINGS = "SET_USER_MEETINGS"


export const REQUEST_SUCCESS = "SUCCESS"
export const REQUEST_FAILURE = "FAILURE"

const actions = {
    user
}
export default actions
