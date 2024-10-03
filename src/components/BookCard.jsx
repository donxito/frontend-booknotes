/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Box, Image, Heading, Text, Button, VStack, HStack, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";



function BookCard({ book }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isBookOwner = book.reader && user && book.reader._id === user._id;

  return (
    <Box
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
                color={index < book.rating ? "yellow.400" : "gray.300"}
              />
            ))}
          </HStack>
          <Text noOfLines={3}>{book.description}</Text>
          <Button
            colorScheme="teal"
            onClick={() => navigate(`/books/${book._id}`)}
            width="full"
          >
            View Details
          </Button>
          {isBookOwner && (
            <HStack width="full">
              <Button
                colorScheme="blue"
                onClick={() => navigate(`/books/${book._id}/edit`)}
                flex={1}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {/* Implement delete functionality */}}
                flex={1}
              >
                Delete
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default BookCard;