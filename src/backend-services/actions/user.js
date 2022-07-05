import * as types from './index';

export const filterByUser = (user) => {
  return {
    type: types.SET_ACTIVE_FILTER_USER,
    payload: user
  }
};


export const loadMeetings = () => {
  return {
    type: types.LOAD_USER_MEETINGS
  }
}





