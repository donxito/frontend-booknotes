import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [coverURL, setCoverURL] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBook = {
        title,
        author,
        description,
        genre,
        year,
        coverURL,
      };
      await booksService.createBook(newBook);
      toast({
        title: "Book added",
        description: "Your book has been successfully added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "Failed to add book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Add New Book
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Author</FormLabel>
                <Input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter book description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Enter book genre"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Enter publication year"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Cover URL</FormLabel>
                <Input
                  type="url"
                  value={coverURL}
                  onChange={(e) => setCoverURL(e.target.value)}
                  placeholder="Enter cover image URL"
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Add Book
              </Button>
            </VStack>
          </form>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default AddBook;