import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authorService from "../services/author.service";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Spinner,
  useToast,
  Container,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function AuthorDetails() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await authorService.getAuthor(authorId);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author:", error);
        toast({
          title: "Error",
          description: "Failed to fetch author details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [authorId, toast]);

  const handleDeleteAuthor = async () => {
    try {
      await authorService.deleteAuthor(authorId);
      toast({
        title: "Author deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/authors");
    } catch (error) {
      console.error("Error deleting author:", error);
      toast({
        title: "Error",
        description: "Failed to delete author",
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

  if (!author) {
    return <Box textAlign="center">Author not found</Box>;
  }

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
          <VStack align="start" spacing={6}>
            <Heading as="h2" size="2xl">
              {author.name}
            </Heading>
            <Text fontSize="xl">{author.bio}</Text>
            <HStack spacing={4}>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="blue"
                onClick={() => navigate(`/authors/${author._id}/edit`)}
              >
                Edit Author
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={handleDeleteAuthor}
              >
                Delete Author
              </Button>
            </HStack>
          </VStack>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default AuthorDetails;