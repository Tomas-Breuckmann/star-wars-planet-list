import React from 'react';
import './App.css';
import Filters from './components/Filtes';
import Table from './components/Table';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <div>
      {/* <span>Hello, App!</span> */}
      <StarProvider>
        <Filters />
        <Table />
      </StarProvider>
    </div>
  );
}

export default App;
