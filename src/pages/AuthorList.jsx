import { useState, useEffect } from "react";
import authorService from "../services/author.service";
import AuthorCard from "../components/authorCard";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorService.getAuthors();
        setAuthors(response.data);
      } catch (error) {
        console.log("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (authorId) => {
    try {
      setAuthors(authors.filter((author) => author._id !== authorId));
      console.log("Author deleted successfully:", authorId);
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="xl" textAlign="center" mb={10}>
          Authors
        </Heading>
        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" />
          </Box>
        ) : authors && Array.isArray(authors) && authors.length ? (
          <AnimatePresence>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {authors.map((author) => (
                <MotionBox
                  key={author._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthorCard author={author} onDelete={handleDeleteAuthor} />
                </MotionBox>
              ))}
            </SimpleGrid>
          </AnimatePresence>
        ) : (
          <Text textAlign="center" fontSize="xl">
            No authors found
          </Text>
        )}
      </MotionBox>
    </Container>
  );
}

export default AuthorList;