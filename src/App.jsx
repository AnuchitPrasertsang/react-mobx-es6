import React from 'react';
import { observer, inject } from 'mobx-react';
import { DocumentOverview, Document } from './Document';
import { Login } from './LoginForm';

@inject("store") @observer
export class App extends React.Component {
  render() {
    let store = this.props.store;
    return <div>
      { renderCurrentView(store) }
      Current User:
      { store.isAuthenticated ? store.currentUser.name: 'unknown' }
    </div>;
  }
}

function renderCurrentView(store) {
  const view = store.currentView;
  if (view) {
    switch (view.name) {
      case 'login':
        return <Login />;
      case 'overview':
        return <DocumentOverview view={view} />;
      case 'document':
        return <Document view={view} />;
    }
  }
}
