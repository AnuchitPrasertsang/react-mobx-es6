import { observable, action, computed } from 'mobx';
import { fromPromise } from 'mobx-utils';

export default class ViewStore {
  @observable currentUser = null;
  @observable currentView = null;

  constructor(fetch) {
    this.fetch = fetch;
  }

  @action showOverview() {
    this.currentView = {
      name: 'overview',
      documents: fromPromise(this.fetch('http://localhost:3000/documents'))
    };
  }

  @action showLogin() {
    this.currentView = {
      name: 'login'
    };
  }

  @computed get isAuthenticated() {
    return this.currentUser !== null;
  }

  @action showDocument(id) {
    if (!this.isAuthenticated) {
      this.showLogin();
      return;
    }

    this.currentView = {
      name: 'document',
      id,
      document: fromPromise(
        this.isAuthenticated
        ? this.fetch(`http://localhost:3000/documents/${id}`)
        : Promise.reject('Authentication required')
      )
    }
  }

  @action performLogin(username, password, callback) {
    if (username === '1234' && password === '1234') {
      this.currentUser = {
        name: username
      }
      callback(true);
    } else {
      callback(false);
    }
  }

  @computed get currentPath() {
    switch (this.currentView.name) {
      case 'overview': return '/documents'
      case 'document': return `/documents/${this.currentView.id}`
      case 'login': return '/login'
    }
  }
}
