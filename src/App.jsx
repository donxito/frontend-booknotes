
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';

import HomePage from './pages/HomePage';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import ProfilePage from './pages/profilePage';

import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddBook from './components/addBook';

import AuthorList from './pages/AuthorList';
import AddAuthor from './components/addAuthor';
import AuthorDetails from './pages/AuthorDetails';

import NotesCard from './components/notesCard';





function App() {
  return (
    <>
    
    <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/books/add" element={<AddBook />} />

        <Route path='/authors' element={<AuthorList />} />
        <Route path='/authors/add' element={<AddAuthor />} />
        <Route path='/authors/:authorId' element={<AuthorDetails />} />

        <Route path='/notes' element={<NotesCard />} />


      
      </Routes>
      </>
 
  );
}

export default App;