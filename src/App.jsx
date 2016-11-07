import React from 'react';
import { observer } from 'mobx-react';
import { DocumentOverview, Document } from './Document';
import { Login } from './LoginForm';

export const App = observer(({ store }) => (
  <div>
    { renderCurrentView(store) }
    Current User:
    { store.isAuthenticated ? store.currentUser.name: 'unknown' }
  </div>
));

function renderCurrentView(store) {
  const view = store.currentView;

  switch (view.name) {
    case 'login':
      return <Login store={store} />;
    case 'overview':
      return <DocumentOverview view={view} store={store} />;
    case 'document':
      return <Document view={view} store={store} />;
  }
}
