import React from 'react';
import './App.css';
import Table from './components/Table';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <div>
      {/* <span>Hello, App!</span> */}
      <StarProvider>
        <Table />
      </StarProvider>
    </div>
  );
}

export default App;
