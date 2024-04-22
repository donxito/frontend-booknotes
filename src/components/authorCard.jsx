/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import booksService from "../services/book.service";

import { Box, Text, Heading} from "@chakra-ui/react";

function AuthorCard({ author }) {

  
  const [books, setBooks] = useState([]);
  const {authorId} = useParams();

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
  }, [authorId]);
  


  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.100"
      boxShadow="md"
      p="4"
    >
      <Heading  style={{ fontSize: "1.6rem", fontFamily: "Proza Libre"}}>
        {author.name}
      </Heading>
      <Text fontSize="lg" mb="4">
        <strong>Bio: </strong> {author.bio}
      </Text>
      <Box>
        <strong>Books: </strong>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`} style={{ fontSize: "1.6rem", color: "primary"}}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default AuthorCard;
