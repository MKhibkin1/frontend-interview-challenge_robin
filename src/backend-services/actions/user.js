import * as types from './index';

export const filterByUser = (user) => {
  return {
    type: types.SET_ACTIVE_FILTER_USER,
    user
  }
};






