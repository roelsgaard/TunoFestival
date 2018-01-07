
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import theme from './themes/base-theme';
import Moment from 'moment';
import daLocale from 'moment/locale/da';

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      Moment.updateLocale('da', daLocale);
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({isLoading: false}))
      };
    }

    render() {
      return (
        <StyleProvider style={getTheme(theme)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
