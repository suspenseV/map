/**
 * Sample React Native App
 *
 * @format
 * @flow strict-local
 */

import AppNavigator from './navigation/AppNavigator';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import store, { persistor } from './redux';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
