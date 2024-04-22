/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import booksService from "../services/book.service";
import BookCard from "../components/bookCard";
import AddNote from "../components/addNote";
import notesService from "../services/notes.service";
import userService from "../services/user.service";

import { Box, Text, Heading, Divider, Center, Grid } from "@chakra-ui/react";

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(" this Book details:", book);
  console.log("the notes are:", notes);

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
    <Box p={4}>
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
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
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
                    p={4}
                    boxShadow="md"
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                  >
                    <Text style={{ fontSize: "20px" }}>{note.content}</Text>
                    <Box>
                      <Text
                        style={{
                          fontSize: "16px",
                          color: "gray",
                          fontStyle: "italic",
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
          <AddNote
            bookId={book._id}
            onNoteAdded={(newNote) => setNotes([...notes, newNote])}
          />
        </>
      ) : (
        <Center>Book not found</Center>
      )}
    </Box>
  );
}

export default BookDetails;
