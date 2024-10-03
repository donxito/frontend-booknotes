import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksService from "../services/book.service";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [loading, setLoading] = useState(true);

  const { bookId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksService.getBook(bookId);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author.name);
        setDescription(book.description);
        setGenre(book.genre);
        setYear(book.year);
        setCoverURL(book.coverURL);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast({
          title: "Error",
          description: "Failed to fetch book details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId, toast]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedBook = {
        title,
        author,
        description,
        genre,
        year,
        coverURL,
      };
      await booksService.updateBook(bookId, updatedBook);
      toast({
        title: "Book updated",
        description: "Your book has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error("Error updating book:", error);
      toast({
        title: "Error",
        description: "Failed to update book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW="container.md" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Edit Book
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Author</FormLabel>
                <Input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Cover URL</FormLabel>
                <Input
                  type="url"
                  value={coverURL}
                  onChange={(e) => setCoverURL(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Update Book
              </Button>
            </VStack>
          </form>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default EditBook;