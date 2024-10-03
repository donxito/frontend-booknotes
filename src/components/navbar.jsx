import { Link } from "react-router-dom";
import {  useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import logo from "../assets/logo-white.png";
import { FaBook, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

const MotionBox = motion(Box);

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logOutUser();
    onClose();
  };

  return (
    <Box bg="gray.900" px={4} position="fixed" top={0} width="100%" zIndex={1000} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: "48px", height: "48px", opacity: 0.7 }} />
          </Link>
        </MotionBox>

        <Spacer />

        <Box display={{ base: "none", md: "block" }}>
          <Flex alignItems="center">
            {!isLoggedIn && (
              <>
              <Button as={Link} to="/login" colorScheme="teal" variant="ghost" mr={3} leftIcon={<FaSignInAlt />}>
                  Login
                </Button>
                <Button as={Link} to="/signup" colorScheme="teal" variant="ghost" mr={3} leftIcon={<FaUserPlus />}>
                  Sign Up
                </Button>
              </>
            )}
            <Button as={Link} to="/books" colorScheme="teal" variant="ghost" mr={3} leftIcon={<FaBook />}>
              Books
            </Button>
            <Button as={Link} to="/authors" colorScheme="teal" variant="ghost" mr={3} leftIcon={<FaUser />}>
              Authors
            </Button>
            {isLoggedIn && (
              <>
                <Button as={Link} to="/books/add" colorScheme="teal" variant="ghost" mr={3}>
                  Add Book
                </Button>
                <Button as={Link} to="/authors/add" colorScheme="teal" variant="ghost" mr={3}>
                  Add Author
                </Button>
                <Button as={Link} to="/profile" colorScheme="teal" variant="ghost" mr={3} leftIcon={<FaUser />}>
                  Profile
                </Button>
                <Button onClick={logOutUser} colorScheme="teal" variant="ghost" leftIcon={<FaSignOutAlt />}>
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            aria-label="Open Menu"
          />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="stretch">
                  {!isLoggedIn && (
                    <>
                      <Button as={Link} to="/login" onClick={onClose} w="100%">
                        Login
                      </Button>
                      <Button as={Link} to="/signup" onClick={onClose} w="100%">
                        Sign Up
                      </Button>
                    </>
                  )}
                  <Button as={Link} to="/books" onClick={onClose} w="100%">
                    Books
                  </Button>
                  <Button as={Link} to="/authors" onClick={onClose} w="100%">
                    Authors
                  </Button>
                  {isLoggedIn && (
                    <>
                      <Button as={Link} to="/books/add" onClick={onClose} w="100%">
                        Add Book
                      </Button>
                      <Button as={Link} to="/authors/add" onClick={onClose} w="100%">
                        Add Author
                      </Button>
                      <Button as={Link} to="/profile" onClick={onClose} w="100%">
                        Profile
                      </Button>
                      <Button onClick={handleLogout} w="100%">
                        Logout
                      </Button>
                    </>
                  )}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;