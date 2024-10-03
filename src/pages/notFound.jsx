/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function NotFound() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      textAlign="center"
      py={20}
    >
      <Heading as="h1" size="4xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={8}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Button as={Link} to="/" colorScheme="teal">
        Go to Homepage
      </Button>
    </MotionBox>
  );
}

export default NotFound;