import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/reactotronConfig';

import AppContainer from './src/navigations/AppNavigation';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="ligth-content" backgroundColor="#7D40E7" />
      <AppContainer />
    </Provider>
  );
}
