import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import backgroundImage from "../assets/background-image.jpg";
import { FaBook } from "react-icons/fa";

const MotionBox = motion(Box);

function HomePage() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // Add padding to account for the fixed navbar and footer
      pt="64px"
      pb="48px"
    >
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          bg="rgba(0, 0, 0, 0.7)"
          p={8}
          borderRadius="md"
          boxShadow="xl"
          pt="64px"
          pb="48px"
        >
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="4xl" color="yellow.400" textAlign="center">
              Mini Book Club
            </Heading>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              A simple note-taking app where you can post your thoughts about
              any book
            </Text>
            <Button
              as={Link}
              to="/books"
              colorScheme="teal"
              size="lg"
              width="full"
              leftIcon={<FaBook />}
            >
              Explore Books
            </Button>
            {isLoggedIn ? (
              <Button
                colorScheme="red"
                size="lg"
                width="full"
                onClick={logOutUser}
              >
                Logout
              </Button>
            ) : (
              <VStack spacing={4}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  Sign Up / Login to get started
                </Text>
                <Button
                  as={Link}
                  to="/signup"
                  colorScheme="purple"
                  size="lg"
                  width="full"
                >
                  Sign Up
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                >
                  Login
                </Button>
              </VStack>
            )}
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default HomePage;
