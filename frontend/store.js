import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import contextInjector from './middlewares/context-injector';
import StateReader from './readers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  reducers,
  applyMiddleware(
    contextInjector(state => ({
      reader: new StateReader(state),
    })),
    sagaMiddleware,
  )
);

sagaMiddleware.run(sagas);
