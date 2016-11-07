import React from 'react';
import { Login } from './LoginForm';
import { observable, action, computed } from 'mobx';

export default class LoginStore {
  @observable name = 'login';

  constructor(fetch) {
    this.fetch = fetch;
  }

  @computed get currentPath() {
    return '/login';
  }

  getView() {
    return <Login />;
  }
}
