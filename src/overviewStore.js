import React from 'react';
import { DocumentOverview } from './Document';
import { observable, action, computed } from 'mobx';

export default class OverviewStore {
  @observable name = 'overview';
  @observable documents = [];

  constructor(fetch) {
    this.fetch = fetch;
  }

  @action getDocuments() {
    return this.fetch('http://localhost:3000/documents')
      .then((documents) => {
        this.documents = documents;
      });
  }

  @computed get currentPath() {
    return '/documents';
  }

  getView() {
    return <DocumentOverview view={this} />;
  }
}
