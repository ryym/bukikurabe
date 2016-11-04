import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import contextInjector from './middlewares/context-injector';
import StateReader from './readers';

export default createStore(
  reducers,
  applyMiddleware(
    contextInjector(state => ({
      reader: new StateReader(state),
    }))
  )
);
