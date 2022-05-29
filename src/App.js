import React from 'react';

import { AppProvider } from './Context/AppContext.js';
import { AppRouter } from './routes/AppRouter';

function App() {
  
  return (
    <div className="App">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  );
}

export default App;
