import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RootStoreProvider from './store/RootStoreProvider';


ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);