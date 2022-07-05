import { combineReducers } from 'redux';
import user from './user';
import connections from './connections'
import chat from './chat'
import orders from './orders'

const rootReducer = combineReducers({
  user, connections, chat, orders
});

export default rootReducer;