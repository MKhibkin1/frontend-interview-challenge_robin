import * as types from '../actions';

const defaultUser = {
    selectedUserFilter: null,
}

export default function(state = defaultUser, action) { 
    const response = action.response;
    switch(action.type) {
        //#region User Logon
        case types.SET_ACTIVE_FILTER_USER:
            return { ...state, loggedIn: true};
        default:
            return state;
        }
};