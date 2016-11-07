import { getLoginView } from './LoginForm';
import { observable, action, computed } from 'mobx';

export default class LoginStore {
  constructor(fetch) {
    this.fetch = fetch;
  }

  @computed get currentPath() {
    return '/login';
  }

  getView() {
    return getLoginView();
  }
}
