import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import authorsService from "../services/author.service";
import AuthorCard from "../components/authorCard";
import { Box, Text, Heading} from "@chakra-ui/react";


function AuthorDetails() {

    const { authorId } = useParams();

    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAuthor = async () => {
            try {
                const response = await authorsService.getAuthor(authorId);
                setAuthor(response.data);
                setLoading(false);
                console.log("Response from server:", response);
            } catch (error) {
                console.log("Error fetching author:", error);
            }
        };
        fetchAuthor();

    }, [authorId]);



  return (
    <Box p={4}>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <Box>
      <Heading
              size="md"
              mb={3}
              style={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Author Details
            </Heading>
        <AuthorCard author={author} />
      </Box>
    )}
    </Box>
  )
}

export default AuthorDetails
