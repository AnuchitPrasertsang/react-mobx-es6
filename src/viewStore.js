import { observable, action, computed, autorun } from 'mobx';
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
    this.requireLogin(() => {
      this.currentView = {
        name: 'document',
        id,
        document: fromPromise(
          this.fetch(`http://localhost:3000/documents/${id}`)
        )
      }
    });
  }

  requireLogin(authorizedAction) {
    if (!this.isAuthenticated) {
      this.showLogin();
    } else {
      authorizedAction();
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
    let mapRoutesName = {
      'login': '/login',
      'overview' : '/documents',
      'document': `/documents/${this.currentView.id}`
    };

    return mapRoutesName[this.currentView.name];
  }
}
