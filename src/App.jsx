
import { Routes, Route } from 'react-router-dom';

import './App.css';

import BookList from './components/BookList';

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold underline">Bopi</h1>

      <Routes>

        <Route path="/" element={<BookList />} />
      
      </Routes>
    </>
  );
}

export default App;