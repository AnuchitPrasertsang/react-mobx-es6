import { createHistory } from 'history';
import { Router } from 'director';
import { autorun } from 'mobx';

export default function startRouter(store) {
  const router = new Router({
    '/documents/:id': (id) => store.showDocument(id),
    '/documents/': () => store.showOverview(),
    '/login/': () => store.showLogin()
  }).configure({
    notfound: () => store.showOverview(),
    html5history: true
  }).init();

  autorun(() => {
    const path = store.currentPath
    if (path !== window.location.pathname)
      window.history.pushState(null, null, path)
  });
}
