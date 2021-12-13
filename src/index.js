import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataProvider } from './DataContext'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
