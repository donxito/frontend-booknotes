/* eslint-disable react/prop-types */
import  { useState } from "react";
import notesService from "../services/notes.service";
import {
  Box,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function AddNote({ bookId, onNoteAdded }) {
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleAddNote = async () => {
    try {
      const response = await notesService.createNote(bookId, { content });
      console.log("New note created:", response.data);
      setContent("");
      toast({
        title: "Note added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onNoteAdded(response.data); // Call this after successfully adding a note
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        title: "Error",
        description: "Failed to add note",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mt={8}
    >
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={6}
        boxShadow="md"
        bg="white"
      >
        <VStack spacing={4} align="stretch">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add your note here..."
            size="lg"
            minHeight="150px"
            borderColor="gray.300"
            _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
          />
          <Button
            colorScheme="teal"
            onClick={handleAddNote}
            isDisabled={!content.trim()}
            size="lg"
            width="full"
            fontWeight="bold"
            _hover={{ bg: "teal.600" }}
          >
            Add Note
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
}

export default AddNote;