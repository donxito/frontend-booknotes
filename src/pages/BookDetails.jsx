import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import booksService from "../services/book.service";
import AddNote from "../components/addNote";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Spinner,
  useToast,
  Container,
  Divider,
} from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksService.getBook(bookId);
        setBook(response.data);
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

  const handleDeleteBook = async () => {
    try {
      await booksService.deleteBook(bookId);
      toast({
        title: "Book deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error",
        description: "Failed to delete book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNoteAdded = (newNote) => {
    setBook((prevBook) => ({
      ...prevBook,
      notes: [...prevBook.notes, newNote],
    }));
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!book) {
    return <Box textAlign="center">Book not found</Box>;
  }

  const isBookOwner = book.reader && user && book.reader._id === user._id;

  return (
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="xl"
          bg="white"
          p={6}
        >
          <HStack spacing={8} align="start">
            <Image
              src={book.coverURL}
              alt={book.title}
              objectFit="cover"
              boxSize="300px"
              borderRadius="md"
            />
            <VStack align="start" spacing={4} flex={1}>
              <Heading as="h2" size="2xl">
                {book.title}
              </Heading>
              <Text fontSize="xl" fontWeight="bold">
                by {book.author?.name}
              </Text>
              <HStack>
                <Badge colorScheme="purple">{book.genre}</Badge>
                <Badge colorScheme="green">{book.year}</Badge>
              </HStack>
              <Text fontSize="md">Posted by: {book.reader?.name}</Text>
              <HStack spacing={1}>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    color={index < book.rating ? "yellow.400" : "gray.300"}
                  />
                ))}
              </HStack>
              <Text fontSize="md">{book.description}</Text>
              {isBookOwner && (
                <HStack spacing={4}>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => navigate(`/books/${book._id}/edit`)}
                  >
                    Edit Book
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={handleDeleteBook}
                  >
                    Delete Book
                  </Button>
                </HStack>
              )}
            </VStack>
          </HStack>

          <Divider my={8} />

          <VStack align="start" spacing={6}>
            <Heading as="h3" size="lg">
              Notes
            </Heading>
            <AnimatePresence>
              {book.notes.map((note) => (
                <MotionBox
                  key={note._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  width="full"
                >
                  <Text fontSize="md">{note.content}</Text>
                  <HStack justify="space-between" mt={2}>
                    <Text fontSize="sm" color="gray.500">
                      {note.user.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                </MotionBox>
              ))}
            </AnimatePresence>
            <AddNote bookId={book._id} onNoteAdded={handleNoteAdded} />
          </VStack>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default BookDetails;