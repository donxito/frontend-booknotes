import { Routes, Route } from "react-router-dom";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn";
import ProfilePage from "./pages/profilePage";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddBook from "./components/addBook";
import EditBook from "./pages/editBook";
import AuthorList from "./pages/AuthorList";
import AddAuthor from "./components/addAuthor";
import AuthorDetails from "./pages/AuthorDetails";
import EditAuthor from "./pages/editAuthor";
import NotesCard from "./components/notesCard";
import NotFound from "./pages/notFound";
import Footer from "./components/footer";

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/books/add" element={<AddBook />} />
              <Route path="/books/:bookId/edit" element={<EditBook />} />
              <Route path="/authors" element={<AuthorList />} />
              <Route path="/authors/add" element={<AddAuthor />} />
              <Route path="/authors/:authorId" element={<AuthorDetails />} />
              <Route path="/authors/:authorId/edit" element={<EditAuthor />} />
              <Route path="/notes" element={<NotesCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;