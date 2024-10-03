import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import booksService from "../services/book.service";
import BookCard from "../components/BookCard";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Spinner,
  Button,
  VStack,
  Input,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.log("error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8}>
          <Heading as="h2" size="xl" textAlign="center">
            Book List
          </Heading>
          <HStack width="full">
            <Input
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button as={Link} to="/books/add" colorScheme="teal">
              Add Book 
            </Button>
          </HStack>
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <AnimatePresence>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {filteredBooks.map((book) => (
                  <MotionBox
                    key={book._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BookCard book={book} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            </AnimatePresence>
          )}
          {!loading && filteredBooks.length === 0 && (
            <Box textAlign="center">No books found</Box>
          )}
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default BookList;