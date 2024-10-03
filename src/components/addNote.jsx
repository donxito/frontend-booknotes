/* eslint-disable react/prop-types */
import { useState } from "react";
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
      const response = await notesService.createNote({
        bookId,
        content,
      });
      onNoteAdded(response.data);
      setContent("");
      toast({
        title: "Note added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
    >
      <VStack spacing={4} align="stretch">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your note here..."
          size="lg"
        />
        <Button
          colorScheme="teal"
          onClick={handleAddNote}
          isDisabled={!content.trim()}
        >
          Add Note
        </Button>
      </VStack>
    </MotionBox>
  );
}

export default AddNote;