import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware)
  const store = createStore(rootReducer, middleware)
  sagaMiddleware.run(rootSaga)

  return(store)
};

export default configureStore;