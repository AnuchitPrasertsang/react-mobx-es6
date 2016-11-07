import { observable, action, computed, autorun } from 'mobx';
import { fromPromise } from 'mobx-utils';
import OverviewStore from './overviewStore';
import DocumentStore from './documentStore';

export default class ViewStore {
  @observable currentUser = null;
  @observable currentView = null;

  constructor(fetch) {
    this.fetch = fetch;
  }

  @computed get isAuthenticated() {
    return this.currentUser !== null;
  }

  @action showLogin() {
    this.currentView = {
      name: 'login'
    };
  }

  @action showOverview() {
    let overviewStore = new OverviewStore(this.fetch);
    overviewStore.getDocuments().then(() => {
      this.currentView = {
        name: 'overview',
        store: overviewStore
      };
    });
  }

  @action showDocument(id) {
    this.requireLogin(() => {
      let documentStore = new DocumentStore(this.fetch);
      documentStore.getDocumentById(id).then(() => {
        this.currentView = {
          name: 'document',
          store: documentStore
        };
      });
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
    if (this.currentView) {
      switch (this.currentView.name) {
        case 'login': return '/login';
        case 'overview': return '/documents';
        case 'document': return `/documents/${this.currentView.id}`;
      }
    }
  }
}
