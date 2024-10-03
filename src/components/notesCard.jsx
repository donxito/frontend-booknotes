/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import notesService from "../services/notes.service";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function NotesCard({ bookId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!bookId) {
        return;
      }

      try {
        const response = await notesService.getNotesByBookId(bookId);
        setNotes(response.data);
      } catch (error) {
        console.log("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [bookId]);

  return (
    <Container maxW="container.md" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="xl" mb={4}>
            Notes
          </Heading>
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <AnimatePresence>
              <VStack spacing={4} align="stretch">
                {notes.map((note) => (
                  <MotionBox
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <Text fontSize="md" mb={2}>
                        {note.content}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Book: {note.bookId?.title || "Unknown"}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        By: {note.reader ? note.reader.name : "Unknown"}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </AnimatePresence>
          )}
        </Box>
      </MotionBox>
    </Container>
  );
}

export default NotesCard;