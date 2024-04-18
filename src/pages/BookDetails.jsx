/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import booksService from "../services/book.service";
import BookCard from "../components/bookCard";


function BookDetails() {
  const { bookId } = useParams();

  // const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch the books from the server using the booksService
    const getBook = async () => {
      try {
        const response = await booksService.getBook(bookId);
        setBook(response.data);
        console.log("Response from server:", response);
        setLoading(false);
      } catch (error) {
        console.error("error fetching the book:", error);
      }
    };
    getBook();
  }, [bookId]);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {loading ? (
        <p>Loading...</p>
      ) : book ? (
        <BookCard book={book} />
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default BookDetails;
