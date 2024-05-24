/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import booksService from "../services/book.service";
import authorsService from "../services/author.service";
import { AuthContext } from "../context/auth.context";

import { Box, Text, Heading, Button } from "@chakra-ui/react";

function AuthorCard({ author, onDelete }) {
  const { authorId } = useParams();

  const [books, setBooks] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await booksService.getBooks();
        const filteredBooks = response.data.filter(
          (book) => book.author._id && book.author._id === author._id
        );
        setBooks(filteredBooks);
        console.log("Response from server:", response);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    getBooks();
  }, [authorId, author]);

  const handleDeleteAuthor = async (authorId) => {
    try {
      await authorsService.deleteAuthor(authorId);
      // Call onDelete function passed from parent component to trigger refresh
      onDelete(authorId);
      navigate("/authors", { replace: true });
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  console.table("author data:", author);

  return (
    <div className="card-side bg-base-200 border border-gray-300 shadow-md rounded-md max-w-md mx-auto">
      <div className="md:flex">
        <Box
          borderRadius="lg"
          overflow="hidden"
          bg="gray.100"
          boxShadow="md"
          p="30"
        >
          <Heading
            style={{
              fontSize: "1.6rem",
              fontFamily: "Proza Libre",
              paddingBottom: "10px",
            }}
          >
            {author.name}
          </Heading>
          <Text fontSize="lg" mb="4">
            <strong>Bio: </strong> {author.bio}
          </Text>
          <Box>
            <Text fontSize="lg" mb="4">
              <strong>Books: </strong>
            </Text>
            <ul>
              {books.map((book) => (
                <li key={book._id}>
                  <Link
                    to={`/books/${book._id}`}
                    className="text-secondary text-lg underline pb-5"
                  >
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          {/* Button to edit the author */}
          {isLoggedIn && (
            <div className="card-actions justify-end my-6">
              <Button
                px={6}
                py={3}
                fontWeight="bold"
                className="btn btn-primary"
                onClick={() => navigate(`/authors/${author._id}/edit`)}
              >
                Edit
              </Button>

              {/* Button to delete the author */}
              <Button
                px={6}
                py={3}
                fontWeight="bold"
                className="btn btn-primary"
                onClick={() => handleDeleteAuthor(author._id)}
              >
                Delete
              </Button>
            </div>
          )}

          {/* Button to go back */}
          <div className="card-actions justify-end my-4">
            <Button
              px={6}
              py={3}
              fontWeight="bold"
              className="btn btn-secondary"
              onClick={() => navigate(`/books`)}
            >
              Back
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default AuthorCard;
