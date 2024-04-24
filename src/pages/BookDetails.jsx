/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import booksService from "../services/book.service";
import AddNote from "../components/addNote";
import notesService from "../services/notes.service";
import userService from "../services/user.service";
import { AuthContext } from "../context/auth.context";

import BookCard from "../components/BookCard"



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
        console.log("fetched book:", bookResponse.data);
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
        console.log("fetched notes:", fetchedNotes);

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
        console.log("sorted notes:", sortedNotes);

        // Update the state with sorted notes
        setNotes(sortedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    if (book) {
      fetchNotes();
    }
  }, [bookId, book, setNotes]);

  console.log("rendering notes", notes);

  return (
    <div className="flex flex-col items-center my-40">
      <Box p={4}>
        <h2 className="text-3xl font-bold underline my-8 text-center">
          Book Details
        </h2>
        {loading ? (
          <Center>Loading...</Center>
        ) : book ? (
          <>
            <Box w="full" my={4}>
              <BookCard book={book} />
            </Box>

            <Divider my={40} />

            <Box>
              <Heading
                size="md"
                mb={3}
                p={6}
                m={10}
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                "{book.title}" notes
              </Heading>

              {/* Display notes */}
              <Grid
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={4}
              >
                {notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <Box
                      key={note._id}
                      p={4} // Padding
                      m={8} // Margin to create space between cards
                      boxShadow="lg"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="gray.300"
                      backgroundColor="gray.200"
                      style={{ maxHeight: "300px", overflowY: "auto" }} // Set maximum height and enable overflow handling
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: "18px",
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
            {console.log("isLoggedIn:", isLoggedIn)}
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
      <div className="spacer" style={{ height: '500px' }}></div> {/* Placeholder element */}
    </div>
  );
}

export default BookDetails;
