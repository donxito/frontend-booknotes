
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddBook from './components/addBook';

import AuthorList from './pages/AuthorList';

import NotesCard from './components/notesCard';



function App() {
  return (
    

      <Routes>

        <Route path="/" element={<HomePage />} />
        
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/books/add" element={<AddBook />} />

        <Route path='/authors' element={<AuthorList />} />

        <Route path='/notes' element={<NotesCard />} />


      
      </Routes>
 
  );
}

export default App;