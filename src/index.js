import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

import startRouter from './router';
import simpleFetch from './simpleFetch';
import { App } from './App';
import ViewStore from './viewStore';

useStrict(true);

const viewStore = new ViewStore(simpleFetch);
startRouter(viewStore);

ReactDOM.render(
  <Provider store={viewStore}>
    <App />
  </Provider>,
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

