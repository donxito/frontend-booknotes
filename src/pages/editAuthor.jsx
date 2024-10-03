import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authorService from "../services/author.service";
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

function EditAuthor() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const { authorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await authorService.getAuthor(authorId);
        const author = response.data;
        setName(author.name);
        setBio(author.bio);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAuthor = { name, bio };
      await authorService.updateAuthor(authorId, updatedAuthor);
      toast({
        title: "Author updated",
        description: "The author has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/authors/${authorId}`);
    } catch (error) {
      console.error("Error updating author:", error);
      toast({
        title: "Error",
        description: "Failed to update author",
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
            Edit Author
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Update Author
              </Button>
            </VStack>
          </form>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default EditAuthor;