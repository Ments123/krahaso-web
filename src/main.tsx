import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './app-updates.css';
import { trackPageView } from './lib/analytics';

// The visit itself, sent once per load. Without it the store clicks in
// AppAcquisitionCta have no denominator and acquisition stays unjudgeable,
// which is the whole reason this file changed.
trackPageView();

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
