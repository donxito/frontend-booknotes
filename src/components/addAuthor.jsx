import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function AddAuthor() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAuthor = { name, bio };
      await authorService.createAuthor(newAuthor);
      toast({
        title: "Author added",
        description: "The author has been successfully added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/authors");
    } catch (error) {
      console.error("Error adding author:", error);
      toast({
        title: "Error",
        description: "Failed to add author",
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
            Add New Author
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter author name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter author bio"
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Add Author
              </Button>
            </VStack>
          </form>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default AddAuthor;