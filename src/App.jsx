import React from 'react';
import { observer, inject } from 'mobx-react';

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
  if (store.currentView) {
    return store.currentView.getView();
  }
}
