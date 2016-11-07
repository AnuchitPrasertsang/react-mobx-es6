import { observable, action } from 'mobx';

export default class DocumentStore {
  @observable document = null;

  constructor(fetch) {
    this.fetch = fetch;
  }

  @action getDocumentById(id) {
    return this.fetch(`http://localhost:3000/documents/${id}`)
      .then((document) => {
        this.document = document;
      });
  }
}
