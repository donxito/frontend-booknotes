import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import booksService from "../services/book.service";
import NotesCard from "../components/notesCard";
import AddNote from "../components/addNote";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Spinner,
  useToast,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksService.getBook(bookId);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
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

  const handleNoteAdded = async () => {
    try {
      const response = await booksService.getBook(bookId);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching updated book details:", error);
      toast({
        title: "Error",
        description: "Failed to update book details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!book) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text fontSize="xl">Book not found</Text>
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" py={[8, 12, 20]}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={[4, 6, 8]} align="start">
          <Flex direction={["column", "column", "row"]} w="100%" gap={[4, 6, 8]}>
            <Image
              src={book.coverURL}
              alt={book.title}
              boxSize={["200px", "250px", "300px"]}
              objectFit="cover"
              borderRadius="md"
              alignSelf={["center", "center", "flex-start"]}
            />
            <VStack align="start" spacing={[2, 3, 4]} flex={1}>
              <Heading as="h2" size={["xl", "2xl"]}>
                {book.title}
              </Heading>
              <Text fontSize={["lg", "xl"]}>by {book.author?.name}</Text>
              <Text fontSize={["sm", "md"]}>{book.description}</Text>
              <HStack spacing={2} wrap="wrap">
                <Badge colorScheme="blue">{book.genre}</Badge>
                <Badge colorScheme="green">Year: {book.year}</Badge>
                <Badge colorScheme="yellow">Rating: {book.rating}/5</Badge>
              </HStack>
            </VStack>
          </Flex>
          <Divider my={[4, 6, 8]} />
          <Heading as="h3" size={["lg", "xl"]}>
            Notes
          </Heading>
          <Box w="100%">
            <NotesCard notes={book.notes} />
          </Box>
          <Box w="100%">
            <AddNote bookId={bookId} onNoteAdded={handleNoteAdded} />
          </Box>
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default BookDetails;