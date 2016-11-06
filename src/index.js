import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import ViewStore from './viewStore';

import startRouter from './router';
import simpleFetch from './simpleFetch';

const viewStore = new ViewStore(simpleFetch);
startRouter(viewStore);

ReactDOM.render(<App store={viewStore} />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

