import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import booksService from "../services/book.service";
import BookCard from "../components/bookCard";
import AddNote from "../components/addNote";
import notesService from "../services/notes.service";

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
                const notes = await notesService.getNotesByBookId(bookId);
                setNotes(notes.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [bookId]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : book ? (
        <>
          <BookCard book={book} />
          <AddNote bookId={book._id} />
          <div>
            <h2>Notes</h2>
            {notes && notes.length > 0 ? (
              <ul>
                {notes.map(note => (
                  <li key={note._id}>{note.content}</li>
                ))}
              </ul>
            ) : (
              <p>No notes available for this book.</p>
            )}
          </div>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default BookDetails;
