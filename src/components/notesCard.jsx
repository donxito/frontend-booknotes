/* eslint-disable react/prop-types */
import {
  Box,
  Text,
  VStack,
  Spinner,
  Center,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function NotesCard({ notes }) {
  if (!notes) {
    return (
      <Center py={8}>
        <Spinner size="lg" thickness="4px" speed="0.65s" color="teal.500" />
      </Center>
    );
  }

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <AnimatePresence>
        {notes.length === 0 ? (
          <Text fontSize="lg" color="gray.500" textAlign="center">
            No notes available for this book.
          </Text>
        ) : (
          notes.map((note) => (
            <MotionBox
              key={note._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              p={6}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="md"
              bg="white"
            >
              <Text fontSize="md" color="gray.700" mb={3}>
                {note.content}
              </Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="gray.500">
                  By: {note.user && note.user.name ? note.user.name : "Anonymous"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </Text>
              </HStack>
            </MotionBox>
          ))
        )}
      </AnimatePresence>
    </VStack>
  );
}

export default NotesCard;