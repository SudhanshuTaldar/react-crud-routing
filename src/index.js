import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import allReducers from './Reducers';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

// const action = type => store.dispatch({ type })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

reportWebVitals();
