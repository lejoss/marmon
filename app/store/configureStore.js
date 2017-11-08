import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from '../reducers';
import * as actionCreators from '../actions';

export default function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({ realtime: true, actionCreators });
  const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

  // don't delete this
  /*
  const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
  const store = createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
  );
  */

  return store;
}
