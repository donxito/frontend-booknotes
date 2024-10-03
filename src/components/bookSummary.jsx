/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Box, Image, Heading, Text, Button, VStack, HStack, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function BookSummary({ book }) {
  const { user } = useContext(AuthContext);
  const   [bookRating, setBookRating] = useState(() => {
    const storedRating = localStorage.getItem(`bookRating_${book._id}`);
    return storedRating ? parseInt(storedRating) : book.rating || 0;
  });

  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    if (book.reader && book.reader._id === user._id) {
      setBookRating(newRating);
      localStorage.setItem(`bookRating_${book._id}`, newRating);
    }
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
    >
      <Image src={book.coverURL} alt={book.title} objectFit="cover" height="300px" width="100%" />
      <Box p={6}>
        <VStack align="start" spacing={3}>
          <Heading as="h3" size="lg" isTruncated>
            {book.title}
          </Heading>
          <Text fontSize="md" color="gray.500">
            by {book.author?.name}
          </Text>
          <HStack>
            <Badge colorScheme="purple">{book.genre}</Badge>
            <Badge colorScheme="green">{book.year}</Badge>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Posted by: {book.reader?.name}
          </Text>
          <HStack spacing={1}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                color={index < bookRating ? "yellow.400" : "gray.300"}
                cursor="pointer"
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </HStack>
          <Button
            colorScheme="teal"
            onClick={() => navigate(`/books/${book._id}`)}
            width="full"
          >
            Book Details
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
}

export default BookSummary;