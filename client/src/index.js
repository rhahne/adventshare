import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';
import { BrowserRouter } from "react-router-dom";
import './styles/customStyle.css';

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>, 
  document.getElementById('root')
);
serviceWorker.unregister();