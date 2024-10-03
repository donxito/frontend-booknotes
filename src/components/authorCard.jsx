/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function AuthorCard({ author, onDelete }) {
  const navigate = useNavigate();

  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={6}
    >
      <VStack align="start" spacing={4}>
        <Heading as="h3" size="lg">
          {author.name}
        </Heading>
        <Text fontSize="md" noOfLines={3}>
          {author.bio}
        </Text>
        <HStack spacing={4}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="blue"
            onClick={() => navigate(`/authors/${author._id}/edit`)}
          >
            Edit
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => onDelete(author._id)}
          >
            Delete
          </Button>
        </HStack>
        <Button
          colorScheme="teal"
          onClick={() => navigate(`/authors/${author._id}`)}
          width="full"
        >
          View Details
        </Button>
      </VStack>
    </MotionBox>
  );
}

export default AuthorCard;