/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Container,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, InfoIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = { name, email, password, about };
      await authService.signup(requestBody);
      toast({
        title: "Account created",
        description: "You've successfully signed up!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to sign up",
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
            Sign Up
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon color="gray.300" />} />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    bg="gray.50" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon color="gray.300" />} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    bg="gray.50" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="gray.300" />} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    bg="gray.50" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>About</FormLabel>
                <Input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself"
                  bg="gray.50" 
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
      </MotionBox>
    </Container>
  );
}

export default SignUp;