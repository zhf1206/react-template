import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './redux/store/store';
import Router from './routes';
import './assets/css/reset.less';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(Router)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Router);
  })
}

registerServiceWorker();
