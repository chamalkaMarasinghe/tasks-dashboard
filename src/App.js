import React from 'react';
import Router from './router/Routes';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Router />
      </div>
    </Provider>
  );
}

export default App;