import "babel-polyfill";

import './scss/bootstrap.scss';
import './scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const renderApplication = () => {
  ReactDOM.render(
    <App /> ,
    document.getElementById('app')
  );
}

renderApplication(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    renderApplication();
  });
}
