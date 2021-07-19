import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  rootElement
);

registerServiceWorker();