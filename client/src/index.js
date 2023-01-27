import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from './reducers/index'
// import authReducer from './reducers/auth';
// import currentUserReducer from './reducers/currentUser';
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({reducer: Reducers, middleware: [thunk]})
// const store = configureStore(Reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
