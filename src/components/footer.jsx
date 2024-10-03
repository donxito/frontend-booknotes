import { Link } from "react-router-dom";
import { IoLogoLinkedin, IoLogoGithub, IoPersonCircle } from "react-icons/io5";
import { Box, Flex, Text, IconButton, useColorModeValue } from "@chakra-ui/react";

function Footer() {
  const date = new Date().getFullYear();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box as="footer" bg={bgColor} color={textColor} py={1} position="fixed" bottom={0} width="100%" zIndex={1000} boxShadow="md">
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <Text fontSize="sm" mr={4}>
          <Link to="https://mchito.vercel.app" className="font-bold">
            Copyright © Miguel Chito {date}
          </Link>
        </Text>
        <Flex>
          <IconButton
            as={Link}
            to="https://www.linkedin.com/in/miguelchito-reactdeveloper"
            aria-label="LinkedIn"
            icon={<IoLogoLinkedin />}
            size="sm"
            variant="ghost"
            mr={2}
          />
          <IconButton
            as={Link}
            to="https://github.com/donxito"
            aria-label="GitHub"
            icon={<IoLogoGithub />}
            size="sm"
            variant="ghost"
            mr={2}
          />
          <IconButton
            as={Link}
            to="https://mchito.vercel.app"
            aria-label="Personal Website"
            icon={<IoPersonCircle />}
            size="sm"
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;