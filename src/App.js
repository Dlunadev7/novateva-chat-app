import React from 'react';

import { AppProvider } from './context/AppContext.js';
import { AppRouter } from './routes/AppRouter';

import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <div className="App">
      <AppProvider>
        <AppRouter />
      </AppProvider>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <ToastContainer />
    </div>
  );
}

export default App;
