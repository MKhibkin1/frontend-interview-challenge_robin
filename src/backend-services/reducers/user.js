import * as types from '../actions';

const defaultUser = {
    filter: null,
    meetings:{
        data: [],
        requested: false,
        successful: types.REQUEST_SUCCESS
    } 
}

export default function(state = defaultUser, action) { 

    const payload = action.payload;
    switch(action.type) {
        case types.SET_ACTIVE_FILTER_USER:
            return { ...state, filter: payload};
        case types.SET_USER_MEETINGS:
            return {...state, meetings: {...state.meetings, data: payload}}
        case types.MEETING_LOAD_STATUS:
            return {...state, meetings: {...state.meetings, requested: payload}}
        case types.MEETING_LOAD_OUTCOME:
            return {...state, meetings: {...state.meetings, successful: payload}}

        default:
            return state;
        }
};