import { observable } from 'mobx';

export default class DocumentStore {
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
