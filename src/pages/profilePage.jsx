/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import booksService from "../services/book.service";
import BookSummary from "../components/bookSummary";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Container,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await booksService.getBooks();
        const userBooks = booksResponse.data.filter(book => book.reader?._id === user._id);
        setBooks(userBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your books",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    if (user) {
      fetchBooks();
    }
  }, [user, toast]);

  const handleLogOut = () => {
    setIsLoggingOut(true);
    logOutUser();
    setIsLoggingOut(false);
  };

  if (!user) {
    return <Box textAlign="center">Loading...</Box>;
  }

  const greeting = (() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={10} align="stretch">
          <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
            <Heading as="h2" size="xl" mb={6}>
              {greeting}, {user.name}!
            </Heading>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg">
                <strong>Email:</strong> {user.email}
              </Text>
              {user.username && (
                <Text fontSize="lg">
                  <strong>Username:</strong> {user.username}
                </Text>
              )}
              <Button
                colorScheme="red"
                onClick={handleLogOut}
                isLoading={isLoggingOut}
                loadingText="Logging Out"
              >
                Logout
              </Button>
            </VStack>
          </Box>

          <Box>
            <Heading as="h3" size="lg" mb={6}>
              My Books:
            </Heading>
            {books.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {books.map((book) => (
                  <MotionBox
                    key={book._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BookSummary book={book} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            ) : (
              <Text>You haven't added any books yet.</Text>
            )}
          </Box>
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default ProfilePage;