import React from 'react';
import { observer, inject } from 'mobx-react';
import Login from './LoginForm';

export function getOverviewView(viewStore) {
  return <DocumentOverview view={viewStore} />
}

export function getDocumentView(viewStore) {
  return <Document view={viewStore} />
}

export const DocumentOverview = inject("store")(observer(({ view, store }) => {
  return (
    <div>
      <h1>Document overview</h1>
      <ul>
        { view.documents.map(doc => {
            return (
              <li key={doc.id}
                onClick={() => store.showDocument(doc.id)}>
                <a>{doc.title}</a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}));

export const Document = inject("store")(observer(({ view, store }) => {
  return (
    <div>
      <button onClick={() => store.showOverview()}>Overview</button>
      <h1>{view.document.title}</h1>
      <p>{view.document.content}</p>
    </div>
  );
}));

const Error = ({error}) => <h1>Error: {error}</h1>;

