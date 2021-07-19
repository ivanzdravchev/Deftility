import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer  from './reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  // add support for Redux DevTools Chrome extension
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
