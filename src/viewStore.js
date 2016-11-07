import { observable, action, computed, autorun } from 'mobx';
import OverviewStore from './overviewStore';
import DocumentStore from './documentStore';
import LoginStore from './loginStore';

export default class ViewStore {
  @observable currentUser = null;
  @observable currentView = null;

  constructor(fetch) {
    this.fetch = fetch;
  }

  @computed get isAuthenticated() {
    return this.currentUser !== null;
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
    return this.currentView ? this.currentView.currentPath : '';
  }

  @action showLogin() {
    let loginStore = new LoginStore(this.fetch);
    this.currentView = loginStore;
  }

  @action showOverview() {
    let overviewStore = new OverviewStore(this.fetch);
    overviewStore.getDocuments().then(() => {
      this.currentView = overviewStore;
    });
  }

  @action showDocument(id) {
    this.requireLogin(() => {
      let documentStore = new DocumentStore(this.fetch);
      documentStore.getDocumentById(id).then(() => {
        this.currentView = documentStore;
      });
    });
  }
}
