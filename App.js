import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/reducers/store';
import AppNavigator from './src/navigation';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    );
  }
}
