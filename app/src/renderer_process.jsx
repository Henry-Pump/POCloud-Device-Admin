import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxThunk from 'redux-thunk';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';

import reducers from './reducers';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} default />
            <Redirect to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


ReactDOM.render(<App />, document.getElementById('root'));
