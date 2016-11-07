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
  switch (view.document.state) {
    case 'pending':
      return <h1>Loading document.. { view.id }</h1>;
    case 'rejected':
      return <Error error={view.document.reason} />;

    case 'fulfilled':
      return (
        <div>
          <button onClick={() => store.showOverview()}>Overview</button>
          <h1>{view.document.value.title}</h1>
          <p>{view.document.value.content}</p>
        </div>
      );
  }
});

const Error = ({error}) => <h1>Error: {error}</h1>;

