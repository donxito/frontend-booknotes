/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import notesService from "../services/notes.service";



function BookCard({ book }) {

  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState(null);

  useEffect(() => {
    console.log("Note ID:", book.notes); 
    const fetchNoteContent = async () => {
      try {
        // Extract the note ID from book.notes
        const noteId = book.notes._id;
        const response = await notesService.getNote(noteId);
        setNoteContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    if (book.notes) {
      fetchNoteContent();
    }
  }, [book.notes]);


  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="md:flex">
        {/* Image Container */}
        <figure>
          <img
            src={book.coverURL}
            alt={book.title}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </figure>
        {/* Text Content */}
        <div className="card-body">
          <h2 className="card-title">
            {book.title}
          </h2>
          <p className="text-lg mb-2">
            <strong>Genre: </strong>
            {book.genre}
          </p>
          <p className="text-lg mb-2">
            <strong>Year: </strong>
            {book.year}
          </p>
          <p className="text-lg mb-2">
            <strong>Description: </strong>
            {book.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Author: </strong>
            {book.author?.name}
          </p>
          {noteContent && (
            <p className="text-lg mb-2">
              <strong>Note: </strong>
              {noteContent}
            </p>
          )}
          <p className="text-lg mb-2">
            <strong>Reader: </strong>
            {book.reader?.name}
          </p>
          <div className="card-actions justify-end">
          <Button
            px={6}
            py={3}
            fontWeight="bold"
            className="btn btn-primary"
            onClick={() => navigate(`/authors/${book.author?._id}`)}
          >
            Author Details
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
