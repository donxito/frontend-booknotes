/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import booksService from "../services/book.service";
import BookCard from "../components/bookCard";
import AddNote from "../components/addNote";
import notesService from "../services/notes.service";
import userService from "../services/user.service";
import { AuthContext } from "../context/auth.context";

import { Box, Text, Heading, Divider, Center, Grid } from "@chakra-ui/react";

function BookDetails() {
  const { bookId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch the book and notes from the server using the booksService
  useEffect(() => {
    const fetchBookAndNotes = async () => {
      try {
        const bookResponse = await booksService.getBook(bookId);
        setBook(bookResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBookAndNotes();
  }, [bookId]);

  // Fetch notes for the book
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesResponse = await notesService.getNotesByBookId(bookId);
        let fetchedNotes = notesResponse.data;

        // Fetch user info for each note
        const notesWithUser = await Promise.all(
          fetchedNotes.map(async (note) => {
            const userResponse = await userService.getUser(note.user);
            return {
              ...note,
              user: userResponse.data, // Replace user ID with user info
            };
          })
        );

        // Sort notes by createdAt timestamp in ascending order
        const sortedNotes = notesWithUser.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Update the state with sorted notes
        setNotes(sortedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [bookId]);

  return (
    <div className="flex flex-col items-center">
      <Box p={4}>
        <h2 className="text-3xl font-bold underline my-4 text-center">
          Book Details
        </h2>
        {loading ? (
          <Center>Loading...</Center>
        ) : book ? (
          <>
            <BookCard book={book} />
            <Divider my={4} />
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
              >
                "{book.title}" notes
              </Heading>
              <Grid
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={4}
              >
                {notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <Box
                      key={note._id}
                      p={4} // Padding
                      m={4} // Margin to create space between cards
                      boxShadow="md" // Shadow
                      borderRadius="md" // Rounded corners
                      border="3px" // Border
                      borderColor="gray.200" // Border color
                      backgroundColor="#E4D7B4" // Background color
                      style={{ maxHeight: "300px", overflowY: "auto" }} // Set maximum height and enable overflow handling
                    >
                      {/* Apply styles to contain the text within the card */}
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: "20px",
                          lineHeight: "1.4",
                          padding: "8px",
                          margin: "8px",
                          wordWrap: "break-word", // Enable word wrapping
                        }}
                      >
                        {note.content}
                      </Text>
                      <Box>
                        <Text
                          style={{
                            textAlign: "right",
                            fontSize: "16px",
                            color: "gray",
                            fontStyle: "italic",
                            padding: "8px",
                            margin: "8px",
                          }}
                        >
                          {note.user.name}
                          <Text
                            style={{
                              fontSize: "12px",
                              color: "gray",
                              fontStyle: "italic",
                            }}
                          >
                            {new Date(note.createdAt).toLocaleDateString()}
                          </Text>
                        </Text>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>No notes available for this book.</Text>
                )}
              </Grid>
            </Box>
            {/* Allow only logged-in users to add notes */}
            {isLoggedIn && (
              <AddNote
                bookId={book._id}
                onNoteAdded={(newNote) => setNotes([...notes, newNote])}
              />
            )}
          </>
        ) : (
          <Center>Book not found</Center>
        )}
      </Box>
    </div>
  );
}

export default BookDetails;
