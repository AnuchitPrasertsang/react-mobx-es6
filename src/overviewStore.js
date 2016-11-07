import { observable, action } from 'mobx';

export default class OverviewStore {
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
}
