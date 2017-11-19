import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from '../reducers';
import * as actionCreators from '../actions';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth.login', 'setup']
}

const combinedReducer = persistCombineReducers(config, reducer);

export default function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({ realtime: true, actionCreators });

  let store = createStore(combinedReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
  let persistor = persistStore(store)

  // don't delete this
  /*
  const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
  const store = createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
  );
  */

  return { persistor, store };
}
