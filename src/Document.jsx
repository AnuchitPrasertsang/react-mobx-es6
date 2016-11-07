import React from 'react';
import { observer } from 'mobx-react';
import Login from './LoginForm';

export const DocumentOverview = observer(({ view, store }) => {
  return (
    <div>
      <h1>Document overview</h1>
      <ul>
        { view.store.documents.map(doc => {
            return <li key={doc.id} onClick={() => store.showDocument(doc.id)}><a>{doc.title}</a></li>;
          })
        }
      </ul>
    </div>
  );
});

export const Document = observer(({ view, store }) => {
  return (
    <div>
      <button onClick={() => store.showOverview()}>Overview</button>
      <h1>{view.store.document.title}</h1>
      <p>{view.store.document.content}</p>
    </div>
  );
});

const Error = ({error}) => <h1>Error: {error}</h1>;

