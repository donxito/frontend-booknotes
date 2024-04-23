import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import authorsService from "../services/author.service";
import AuthorCard from "../components/authorCard";
import { Box, Text, Heading } from "@chakra-ui/react";

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
    <div className="flex flex-col items-center">
      <Box p={4}>
        <h2 className="text-3xl font-bold underline my-4 text-center">
          Author Details
        </h2>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box>
            <Heading
              size="md"
              mb={3}
              p={6}
              m={6}
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                textDecoration: "underline",
              }}
            ></Heading>
            <AuthorCard author={author} />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default AuthorDetails;
